"use client";

import { useEffect, useState } from "react";
import {
  fetchPaymentHistory,
  fetchSubscriptions,
} from "@/features/mollie/actions/subscriptions";
import { PaymentHistory } from "@/features/mollie/components/PaymentHistory";
import { SubscriptionCard } from "@/features/mollie/components/SubscriptionCard";
import { NewSubscriptionForm } from "@/features/mollie/components/NewSubscriptionForm";
import Button from "@/components/ui/atoms/Button";
import type {
  SerializedPayment,
  SerializedSubscription,
} from "@/features/mollie/types";

export default function GevenPage() {
  const [payments, setPayments] = useState<SerializedPayment[]>([]);
  const [subscriptions, setSubscriptions] = useState<SerializedSubscription[]>(
    []
  );
  const [isLoadingPayments, setIsLoadingPayments] = useState(true);
  const [isLoadingSubscriptions, setIsLoadingSubscriptions] = useState(true);
  const [showNewSubscriptionForm, setShowNewSubscriptionForm] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "subscriptions" | "history" | "anbi"
  >("subscriptions");

  const loadData = async () => {
    // Load payments
    setIsLoadingPayments(true);
    const paymentResult = await fetchPaymentHistory();
    if (paymentResult.success) {
      setPayments(paymentResult.payments);
    }
    setIsLoadingPayments(false);

    // Load subscriptions
    setIsLoadingSubscriptions(true);
    const subscriptionResult = await fetchSubscriptions();
    if (subscriptionResult.success) {
      setSubscriptions(subscriptionResult.subscriptions);
    }
    setIsLoadingSubscriptions(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubscriptionUpdate = () => {
    loadData();
    setShowNewSubscriptionForm(false);
  };

  return (
    <div className="mx-auto max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-4xl font-bold md:text-5xl mb-2">
          Geven
        </h1>
        <p className="text-gray-600">
          Beheer je giften voor Jesus Central Church
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex gap-8">
          <button
            onClick={() => setActiveTab("subscriptions")}
            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "subscriptions"
                ? "border-brand-orange text-brand-orange"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Maandelijkse giften
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "history"
                ? "border-brand-orange text-brand-orange"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Geschiedenis
          </button>
          <button
            onClick={() => setActiveTab("anbi")}
            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "anbi"
                ? "border-brand-orange text-brand-orange"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            ANBI
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === "subscriptions" && (
        <div className="space-y-6">
          {/* New Subscription Button/Form */}
          {!showNewSubscriptionForm ? (
            <Button
              type="strategy-red"
              variant="primary"
              size="medium"
              onClick={() => setShowNewSubscriptionForm(true)}
            >
              + Nieuw maandelijkse gift
            </Button>
          ) : (
            <NewSubscriptionForm
              onSuccess={handleSubscriptionUpdate}
              onCancel={() => setShowNewSubscriptionForm(false)}
            />
          )}

          {/* Subscriptions List */}
          <div>
            <h2 className="text-xl font-bold mb-4">Mijn maandelijkse giften</h2>
            {isLoadingSubscriptions ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-brand-orange"></div>
                <p className="text-gray-500 mt-4">Laden...</p>
              </div>
            ) : subscriptions.length === 0 ? (
              <div className="text-center py-12 text-gray-500 border border-gray-200 rounded-lg">
                <svg
                  className="w-12 h-12 mx-auto mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="font-medium">Geen maandelijkse giften</p>
                <p className="text-sm mt-1">
                  Maak je eerste maandelijkse gift aan om regelmatig te geven
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {subscriptions.map((subscription) => (
                  <SubscriptionCard
                    key={subscription.id}
                    subscription={subscription}
                    onUpdate={handleSubscriptionUpdate}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "history" && (
        <div>
          <h2 className="text-xl font-bold mb-4">Betalingsgeschiedenis</h2>
          {isLoadingPayments ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-brand-orange"></div>
              <p className="text-gray-500 mt-4">Laden...</p>
            </div>
          ) : (
            <PaymentHistory payments={payments} />
          )}
        </div>
      )}

      {activeTab === "anbi" && (
        <div>
          <h2 className="text-xl font-bold mb-4">ANBI</h2>
          <p className="text-gray-600">
            Door de ANBI-status zijn giften aan onze stichting onder voorwaarden
            fiscaal aftrekbaar. <br /> <br />
            De benodigde informatie staat hieronder: <br /> <br /> Stichting
            Gods Original Design Gouda <br />
            Rijsselseweg 1 <br />
            2803 PZ Gouda <br />
            NL85 RABO 0332 5758 29 <br />
            RSIN-nummer: 858771603
          </p>
        </div>
      )}
    </div>
  );
}
