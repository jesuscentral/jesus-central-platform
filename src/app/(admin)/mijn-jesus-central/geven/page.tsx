'use client'

import { useEffect, useState } from 'react'
import {
  fetchPaymentHistory,
  fetchSubscriptions,
} from '@/features/mollie/actions/subscriptions'
import { PaymentHistory } from '@/features/mollie/components/PaymentHistory'
import { SubscriptionCard } from '@/features/mollie/components/SubscriptionCard'
import { NewSubscriptionForm } from '@/features/mollie/components/NewSubscriptionForm'
import Button from '@/components/ui/atoms/Button'
import type {
  SerializedPayment,
  SerializedSubscription,
} from '@/features/mollie/types'

export default function GevenPage() {
  const [payments, setPayments] = useState<SerializedPayment[]>([])
  const [subscriptions, setSubscriptions] = useState<SerializedSubscription[]>(
    [],
  )
  const [isLoadingPayments, setIsLoadingPayments] = useState(true)
  const [isLoadingSubscriptions, setIsLoadingSubscriptions] = useState(true)
  const [showNewSubscriptionForm, setShowNewSubscriptionForm] = useState(false)
  const [activeTab, setActiveTab] = useState<
    'subscriptions' | 'history' | 'anbi'
  >('subscriptions')

  const loadData = async () => {
    // Load payments
    setIsLoadingPayments(true)
    const paymentResult = await fetchPaymentHistory()
    if (paymentResult.success) {
      setPayments(paymentResult.payments)
    }
    setIsLoadingPayments(false)

    // Load subscriptions
    setIsLoadingSubscriptions(true)
    const subscriptionResult = await fetchSubscriptions()
    if (subscriptionResult.success) {
      setSubscriptions(subscriptionResult.subscriptions)
    }
    setIsLoadingSubscriptions(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleSubscriptionUpdate = () => {
    loadData()
    setShowNewSubscriptionForm(false)
  }

  return (
    <div className="mx-auto max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading mb-2 text-4xl font-bold md:text-5xl">
          Geven
        </h1>
        <p className="text-gray-600">
          Beheer je giften voor Jesus Central Church
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex gap-8">
          <button
            onClick={() => setActiveTab('subscriptions')}
            className={`border-b-2 px-1 pb-4 text-sm font-medium transition-colors ${
              activeTab === 'subscriptions'
                ? 'border-brand-orange text-brand-orange'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            Maandelijkse giften
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`border-b-2 px-1 pb-4 text-sm font-medium transition-colors ${
              activeTab === 'history'
                ? 'border-brand-orange text-brand-orange'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            Geschiedenis
          </button>
          <button
            onClick={() => setActiveTab('anbi')}
            className={`border-b-2 px-1 pb-4 text-sm font-medium transition-colors ${
              activeTab === 'anbi'
                ? 'border-brand-orange text-brand-orange'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            ANBI
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'subscriptions' && (
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
            <h2 className="mb-4 text-xl font-bold">Mijn maandelijkse giften</h2>
            {isLoadingSubscriptions ? (
              <div className="py-12 text-center">
                <div className="border-brand-orange inline-block h-8 w-8 animate-spin rounded-full border-b-2"></div>
                <p className="mt-4 text-gray-500">Laden...</p>
              </div>
            ) : subscriptions.length === 0 ? (
              <div className="rounded-lg border border-gray-200 py-12 text-center text-gray-500">
                <svg
                  className="mx-auto mb-3 h-12 w-12 text-gray-400"
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
                <p className="mt-1 text-sm">
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

      {activeTab === 'history' && (
        <div>
          <h2 className="mb-4 text-xl font-bold">Betalingsgeschiedenis</h2>
          {isLoadingPayments ? (
            <div className="py-12 text-center">
              <div className="border-brand-orange inline-block h-8 w-8 animate-spin rounded-full border-b-2"></div>
              <p className="mt-4 text-gray-500">Laden...</p>
            </div>
          ) : (
            <PaymentHistory payments={payments} />
          )}
        </div>
      )}

      {activeTab === 'anbi' && (
        <div>
          <h2 className="mb-4 text-xl font-bold">ANBI</h2>
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
  )
}
