import type { Amount } from "@mollie/api-client";

/**
 * Serialized Mollie types (plain objects for client components)
 */
export interface SerializedPayment {
  id: string;
  amount: Amount;
  description: string;
  status: string;
  createdAt: string | null;
  paidAt?: string | null;
  method?: string | null;
}

export interface SerializedSubscription {
  id: string;
  amount: Amount;
  description: string;
  status: string;
  interval: string;
  createdAt: string | null;
  nextPaymentDate?: string | null;
  canceledAt?: string | null;
}

/**
 * Response types for server actions
 */
export interface ActionResponse<T = void> {
  success: boolean;
  error?: string;
  message?: string;
  data?: T;
}

export interface PaymentHistoryResponse extends ActionResponse {
  payments: SerializedPayment[];
}

export interface SubscriptionsResponse extends ActionResponse {
  subscriptions: SerializedSubscription[];
}

export interface CreateSubscriptionResponse extends ActionResponse {
  requiresSetup?: boolean;
  redirectUrl?: string;
}

/**
 * Form data types
 */
export interface SubscriptionFormData {
  amount: string;
  interval: string;
  description: string;
}

/**
 * Component prop types
 */
export interface PaymentHistoryProps {
  payments: SerializedPayment[];
}

export interface SubscriptionCardProps {
  subscription: SerializedSubscription;
  onUpdate: () => void;
}

export interface NewSubscriptionFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}
