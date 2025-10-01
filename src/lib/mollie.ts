"use server";

import createMollieClient, { Locale, SequenceType } from "@mollie/api-client";

const apiKey = process.env.MOLLIE_API_KEY;
// const domain = process.env.DOMAIN || "http://localhost:3000";
// const webhookUrl = process.env.WEBHOOK_URL || "http://not.provided";

if (!apiKey) {
  throw new Error("MOLLIE_API_KEY is not defined");
}

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

export const createPayment = async (
  reccuring: boolean = false,
  note: string,
  country: string = "NL"
) => {
  const domain = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:3000";
  const payment = await mollieClient.payments.create({
    billingAddress: {
      familyName: "Hoogendoorn",
      givenName: "Mees",
      streetAndNumber: "Rijsselseweg 1",
      postalCode: "2803PZ",
      city: "Gouda",
      country: "NL",
    },
    amount: {
      value: "10.00",
      currency: "EUR",
    },
    locale: countryToLocale[country],
    description: `GIFT: ${note}`,
    sequenceType: reccuring ? SequenceType.recurring : SequenceType.oneoff,
    redirectUrl: `${domain}/geven/bedankt`,
  });

  const redirectUrl = payment.getCheckoutUrl();

  if (!redirectUrl) {
    throw new Error("Failed to create payment");
  }

  return redirectUrl;
};
