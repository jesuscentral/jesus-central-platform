"use server";

import { clerkClient, currentUser } from "@clerk/nextjs/server";
import createMollieClient, { Locale, SequenceType } from "@mollie/api-client";

const apiKey = process.env.MOLLIE_API_KEY;
// const domain = process.env.DOMAIN || "http://localhost:3000";
// const webhookUrl = process.env.WEBHOOK_URL || "http://not.provided";

if (!apiKey) {
  throw new Error("MOLLIE_API_KEY is not defined");
}

const formatAmount = (amount: string) => {
  const num = Number(amount);
  if (isNaN(num)) throw new Error("Invalid amount");
  // toFixed(2) gives exactly 2 decimals as a string
  return num.toFixed(2);
};

// Set up Mollie API client
const mollieClient = createMollieClient({ apiKey: apiKey });

const countryToLocale: Record<string, Locale> = {
  DE: Locale.de_DE,
  AT: Locale.de_AT,
  NL: Locale.nl_NL,
  FR: Locale.fr_FR,
  UK: Locale.en_US,
  SE: Locale.sv_SE,
  PT: Locale.pt_PT,
  IT: Locale.it_IT,
  CH: Locale.de_CH,
  ES: Locale.es_ES,
};

export const upsertCustomer = async (name: string, email: string) => {
  let customer = null;
  let paginatedCustomers = await getMollieCustomers("", 50);
  while (customer === null && paginatedCustomers.length > 0) {
    customer = paginatedCustomers.find((customer) => customer.email === email);
    if (customer) {
      return updateCustomer(customer.id, name, email);
    }
    paginatedCustomers = await getMollieCustomers(
      paginatedCustomers[paginatedCustomers.length - 1].id,
      50
    );
  }

  return createCustomer(name, email);
};

export const updateCustomer = async (
  customerId: string,
  name: string,
  email: string
) => {
  const customer = await mollieClient.customers.update(customerId, {
    name,
    email,
    metadata: {
      source: process.env.NEXT_PUBLIC_BASE_URL ?? "website",
    },
  });
  return customer;
};

export const createCustomer = async (name: string, email: string) => {
  if (!name || !email) {
    throw Error("No Customer created");
  }
  const customer = await mollieClient.customers.create({
    name,
    email,
    metadata: {
      source: process.env.NEXT_PUBLIC_BASE_URL ?? "website",
    },
  });

  return customer;
};

export const getCustomer = async (customerId: string) => {
  const customer = await mollieClient.customers.get(customerId);
  return customer;
};

export const createPayment = async (
  amount: string,
  reccuring: boolean = false,
  note: string,
  name: string,
  email: string,
  country: string = "NL"
) => {
  const domain = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:3000";
  const clerkUser = await currentUser();

  const customer = clerkUser?.publicMetadata?.mollieCustomerId
    ? await getCustomer(clerkUser.publicMetadata.mollieCustomerId as string)
    : await upsertCustomer(name, email);

  if (clerkUser) {
    await (
      await clerkClient()
    ).users.updateUserMetadata(clerkUser.id, {
      publicMetadata: {
        mollieCustomerId: customer.id,
      },
    });
  }

  const payment = await mollieClient.customerPayments.create({
    customerId: customer.id,
    amount: {
      value: formatAmount(amount),
      currency: "EUR",
    },
    locale: countryToLocale[country],
    description: `Jesus Central Church: ${note}`,
    sequenceType: reccuring ? SequenceType.first : SequenceType.oneoff,
    redirectUrl: `${domain}/geven/bedankt`,
    // webhookUrl: `${domain}/api/webhooks/mollie`,
    metadata: {
      source: process.env.NEXT_PUBLIC_BASE_URL ?? "website",
      email: email,
      name: name,
    },
  });

  const redirectUrl = payment.getCheckoutUrl();

  if (!redirectUrl) {
    throw new Error("Failed to create payment");
  }

  return redirectUrl;
};

export const getPayment = async (paymentId: string) => {
  const payment = await mollieClient.payments.get(paymentId);
  return payment;
};

export const pageMandates = async (customerId: string) => {
  const mandates = await mollieClient.customerMandates.page({ customerId });
  return mandates;
};

export const createSubscription = async (
  customerId: string,
  amount: { currency: string; value: string },
  interval: string,
  description: string,
  startDate: string,
  mandateId: string,
  metadata: Record<string, string>
) => {
  const subscription = await mollieClient.customerSubscriptions.create({
    customerId,
    amount,
    interval,
    description,
    startDate,
    mandateId,
    metadata: {
      ...metadata,
      source: process.env.NEXT_PUBLIC_BASE_URL ?? "website",
    },
  });

  return subscription;
};

export const getMollieCustomers = async (
  from: string = "",
  limit: number = 50
) => {
  const customers = await mollieClient.customers.page({ from, limit });
  return customers;
};

export const getMandates = async (customerId: string) => {
  const mandates = await mollieClient.customerMandates.page({ customerId });
  return mandates;
};

export const getSubscriptions = async (customerId: string) => {
  const subscriptions = await mollieClient.customerSubscriptions.page({
    customerId,
  });
  return subscriptions;
};

export const getPayments = async (customerId: string) => {
  const payments = await mollieClient.customerPayments.page({
    customerId,
  });
  return payments;
};

export const cancelSubscription = async (
  customerId: string,
  subscriptionId: string
) => {
  const subscription = await mollieClient.customerSubscriptions.cancel(
    subscriptionId,
    { customerId }
  );
  return subscription;
};

export const updateSubscription = async (
  customerId: string,
  subscriptionId: string,
  amount: { currency: string; value: string },
  description?: string
) => {
  const subscription = await mollieClient.customerSubscriptions.update(
    subscriptionId,
    {
      customerId,
      amount,
      ...(description && { description }),
    }
  );
  return subscription;
};
