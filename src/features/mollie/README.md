# Mollie Payment Integration Feature

Complete Mollie payment and subscription management feature for Jesus Central Church.

## Overview

This feature provides a comprehensive integration with Mollie's payment API, including:

- **One-off Payments**: Single donations via iDEAL, credit card, etc.
- **Recurring Subscriptions**: Monthly, quarterly, or yearly recurring gifts
- **Customer Management**: Automatic customer creation and updates
- **Payment History**: View all past payments with status tracking
- **Subscription Management**: Create, update, and cancel subscriptions
- **Mandate Handling**: Automatic SEPA mandate setup for recurring payments

## Directory Structure

```
src/features/mollie/
├── index.ts                      # Main API functions and re-exports
├── actions/
│   └── subscriptions.ts          # Server actions for subscription management
├── components/
│   ├── PaymentHistory.tsx        # Display payment history with status badges
│   ├── SubscriptionCard.tsx      # Manage individual subscriptions
│   └── NewSubscriptionForm.tsx   # Create new subscription form
└── types/
    └── index.ts                  # TypeScript type definitions
```

## Usage

### API Functions

Import core Mollie API functions from the feature root:

```typescript
import {
  createPayment,
  createCustomer,
  upsertCustomer,
  getCustomer,
  getPayments,
  getSubscriptions,
  getMandates,
  createSubscription,
  updateSubscription,
  cancelSubscription,
} from "@/features/mollie";
```

#### Create a One-off Payment

```typescript
const redirectUrl = await createPayment(
  "10.00", // amount
  false, // recurring (false for one-off)
  "Gift", // description
  "John Doe", // name
  "john@example.com" // email
);

// Redirect user to Mollie checkout
window.location.href = redirectUrl;
```

#### Create a Recurring Payment (First Payment)

```typescript
const redirectUrl = await createPayment(
  "25.00", // amount
  true, // recurring (true to create mandate)
  "Monthly gift", // description
  "Jane Doe", // name
  "jane@example.com" // email
);

// This creates a mandate for future subscriptions
window.location.href = redirectUrl;
```

### Server Actions

Use server actions for subscription management in client components:

```typescript
import {
  fetchPaymentHistory,
  fetchSubscriptions,
  cancelSubscriptionAction,
  updateSubscriptionAmount,
  createNewSubscription,
} from "@/features/mollie/actions/subscriptions";
```

#### Fetch User's Payment History

```typescript
const result = await fetchPaymentHistory();
if (result.success) {
  const payments = result.payments;
  // Display payments
}
```

#### Fetch User's Subscriptions

```typescript
const result = await fetchSubscriptions();
if (result.success) {
  const subscriptions = result.subscriptions;
  // Display subscriptions
}
```

#### Create a New Subscription

```typescript
const result = await createNewSubscription(
  "15.00", // amount
  "1 month", // interval (1 month, 3 months, 6 months, 12 months)
  "Monthly gift" // description
);

if (result.success) {
  if (result.requiresSetup && result.redirectUrl) {
    // User needs to complete first payment
    window.location.href = result.redirectUrl;
  } else {
    // Subscription created successfully
    console.log(result.message);
  }
}
```

#### Update Subscription Amount

```typescript
const result = await updateSubscriptionAmount(
  "sub_abc123", // subscriptionId
  "20.00", // new amount
  "Updated monthly gift" // optional: new description
);

if (result.success) {
  // Subscription updated
}
```

#### Cancel a Subscription

```typescript
const result = await cancelSubscriptionAction("sub_abc123");
if (result.success) {
  // Subscription canceled
}
```

### Components

Import and use pre-built UI components:

```typescript
import {
  PaymentHistory,
  SubscriptionCard,
  NewSubscriptionForm,
} from "@/features/mollie";
```

#### PaymentHistory Component

Displays a list of payments with status badges:

```typescript
import { PaymentHistory } from "@/features/mollie";
import type { Payment } from "@mollie/api-client";

export function MyPage() {
  const [payments, setPayments] = useState<Payment[]>([]);

  // Fetch payments...

  return <PaymentHistory payments={payments} />;
}
```

**Features:**

- Status badges (Betaald, Open, In behandeling, Mislukt, etc.)
- Formatted dates in Dutch
- Payment method display
- Empty state for no payments

#### SubscriptionCard Component

Manage individual subscriptions with inline editing:

```typescript
import { SubscriptionCard } from "@/features/mollie";
import type { Subscription } from "@mollie/api-client";

export function MySubscriptions() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  const handleUpdate = () => {
    // Refresh subscriptions
  };

  return (
    <>
      {subscriptions.map((sub) => (
        <SubscriptionCard
          key={sub.id}
          subscription={sub}
          onUpdate={handleUpdate}
        />
      ))}
    </>
  );
}
```

**Features:**

- Status badges (Actief, Geannuleerd, Opgeschort, etc.)
- Inline amount editing
- Cancel confirmation modal
- Next payment date display
- Formatted interval text (Maandelijks, Elk kwartaal, etc.)

#### NewSubscriptionForm Component

Form to create new subscriptions:

```typescript
import { NewSubscriptionForm } from "@/features/mollie";

export function SubscriptionsPage() {
  const [showForm, setShowForm] = useState(false);

  const handleSuccess = () => {
    setShowForm(false);
    // Refresh subscriptions
  };

  return showForm ? (
    <NewSubscriptionForm
      onSuccess={handleSuccess}
      onCancel={() => setShowForm(false)}
    />
  ) : (
    <button onClick={() => setShowForm(true)}>
      + Nieuw abonnement
    </button>
  );
}
```

**Features:**

- Amount input (min €1.00)
- Interval selection (monthly, quarterly, semi-annually, yearly)
- Description field
- Info box for mandate setup
- Automatic redirect to Mollie if mandate needed
- Loading states

### Types

Import types for TypeScript type safety:

```typescript
import type {
  Payment,
  Subscription,
  ActionResponse,
  PaymentHistoryResponse,
  SubscriptionsResponse,
  CreateSubscriptionResponse,
  SubscriptionFormData,
  PaymentHistoryProps,
  SubscriptionCardProps,
  NewSubscriptionFormProps,
} from "@/features/mollie";
```

## How It Works

### Customer Management

1. When a user makes their first payment, a Mollie customer is created
2. The customer ID is stored in Clerk's user metadata (`mollieCustomerId`)
3. All subsequent payments are linked to this customer

### Recurring Subscriptions

1. **First Payment**: User must complete a first payment with `sequenceType: "first"` to create a SEPA mandate
2. **Mandate**: The mandate authorizes Mollie to charge the user automatically
3. **Subscription**: Once a valid mandate exists, subscriptions can be created
4. **Auto-charging**: Mollie automatically charges the user at the specified interval

### Flow for Creating a Subscription

```
User clicks "Create Subscription"
  ↓
Check if user has valid mandate
  ↓
  ├─ NO MANDATE
  │    ↓
  │    Create first payment with sequenceType: "first"
  │    ↓
  │    Redirect to Mollie
  │    ↓
  │    User completes payment
  │    ↓
  │    Mandate created
  │    ↓
  │    User returns to site
  │    ↓
  │    Create subscription manually
  │
  └─ HAS VALID MANDATE
       ↓
       Create subscription immediately
       ↓
       Subscription starts tomorrow
```

## Configuration

### Environment Variables

Required environment variables in `.env`:

```bash
MOLLIE_API_KEY=test_xxxxxxxxxxxxx  # or live_xxxxxxxxxxxxx
NEXT_PUBLIC_BASE_URL=https://jesuscentral.church
```

### Clerk Integration

The feature uses Clerk for user authentication and stores the Mollie customer ID in user metadata:

```typescript
user.publicMetadata.mollieCustomerId = "cst_xxxxxxxxxxxxx";
```

## API Reference

### Core Functions

#### `createPayment()`

Creates a one-off or recurring first payment.

```typescript
createPayment(
  amount: string,
  recurring: boolean,
  note: string,
  name: string,
  email: string,
  country?: string
): Promise<string> // Returns checkout URL
```

#### `upsertCustomer()`

Finds existing customer by email or creates new one.

```typescript
upsertCustomer(
  name: string,
  email: string
): Promise<Customer>
```

#### `getPayments()`

Gets all payments for a customer.

```typescript
getPayments(
  customerId: string
): Promise<Payment[]>
```

#### `getSubscriptions()`

Gets all subscriptions for a customer.

```typescript
getSubscriptions(
  customerId: string
): Promise<Subscription[]>
```

#### `getMandates()`

Gets all mandates for a customer.

```typescript
getMandates(
  customerId: string
): Promise<Mandate[]>
```

#### `createSubscription()`

Creates a recurring subscription (requires valid mandate).

```typescript
createSubscription(
  customerId: string,
  amount: { currency: string; value: string },
  interval: string,
  description: string,
  startDate: string,
  mandateId: string,
  metadata: Record<string, string>
): Promise<Subscription>
```

#### `updateSubscription()`

Updates subscription amount or description.

```typescript
updateSubscription(
  customerId: string,
  subscriptionId: string,
  amount: { currency: string; value: string },
  description?: string
): Promise<Subscription>
```

#### `cancelSubscription()`

Cancels an active subscription.

```typescript
cancelSubscription(
  customerId: string,
  subscriptionId: string
): Promise<Subscription>
```

## Example: Complete Subscription Management Page

```typescript
"use client";

import { useEffect, useState } from "react";
import { fetchPaymentHistory, fetchSubscriptions } from "@/features/mollie/actions/subscriptions";
import { PaymentHistory, SubscriptionCard, NewSubscriptionForm } from "@/features/mollie";
import type { Payment, Subscription } from "@mollie/api-client";

export default function GevenPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [showNewForm, setShowNewForm] = useState(false);
  const [activeTab, setActiveTab] = useState<"subscriptions" | "history">("subscriptions");

  const loadData = async () => {
    const paymentResult = await fetchPaymentHistory();
    if (paymentResult.success) {
      setPayments(paymentResult.payments);
    }

    const subscriptionResult = await fetchSubscriptions();
    if (subscriptionResult.success) {
      setSubscriptions(subscriptionResult.subscriptions);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdate = () => {
    loadData();
    setShowNewForm(false);
  };

  return (
    <div>
      <h1>Geven</h1>

      {/* Tabs */}
      <div>
        <button onClick={() => setActiveTab("subscriptions")}>Abonnementen</button>
        <button onClick={() => setActiveTab("history")}>Geschiedenis</button>
      </div>

      {/* Subscriptions Tab */}
      {activeTab === "subscriptions" && (
        <div>
          {!showNewForm ? (
            <button onClick={() => setShowNewForm(true)}>
              + Nieuw abonnement
            </button>
          ) : (
            <NewSubscriptionForm
              onSuccess={handleUpdate}
              onCancel={() => setShowNewForm(false)}
            />
          )}

          <div>
            {subscriptions.map((sub) => (
              <SubscriptionCard
                key={sub.id}
                subscription={sub}
                onUpdate={handleUpdate}
              />
            ))}
          </div>
        </div>
      )}

      {/* History Tab */}
      {activeTab === "history" && (
        <PaymentHistory payments={payments} />
      )}
    </div>
  );
}
```

## Notes

- All amounts are in EUR with 2 decimal places
- Dates are formatted using `date-fns` with Dutch locale
- Components use the project's Button component from `@/components/ui/atoms/Button`
- Cache revalidation is handled automatically via `revalidatePath()` in actions
- Error handling is built into all server actions with user-friendly messages
- Status badges are localized to Dutch

## Support

For Mollie API documentation, visit:

- [Mollie API Docs](https://docs.mollie.com/)
- [Mollie Node.js Client](https://github.com/mollie/mollie-api-node)

For project-specific questions, check the project's CLAUDE.md file.
