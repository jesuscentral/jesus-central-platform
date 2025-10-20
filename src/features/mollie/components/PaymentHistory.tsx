'use client'

import type { SerializedPayment } from '../types'
import { format } from 'date-fns'
import { nl } from 'date-fns/locale'

interface PaymentHistoryProps {
  payments: SerializedPayment[]
}

export function PaymentHistory({ payments }: PaymentHistoryProps) {
  if (payments.length === 0) {
    return (
      <div className="py-12 text-center text-gray-500">
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
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <p className="font-medium">Geen betalingen gevonden</p>
        <p className="mt-1 text-sm">Je hebt nog geen giften gedaan</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {payments.map((payment) => (
        <div
          key={payment.id}
          className="hover:border-brand-orange/50 rounded-lg border border-gray-200 p-4 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-gray-900">
                  {payment.description}
                </h3>
                <StatusBadge status={payment.status} />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                {payment.createdAt &&
                  format(
                    new Date(payment.createdAt),
                    "d MMMM yyyy 'om' HH:mm",
                    {
                      locale: nl,
                    },
                  )}
              </p>
              {payment.method && (
                <p className="mt-1 text-xs text-gray-400">
                  Betaalmethode: {getPaymentMethodName(payment.method)}
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">
                €{payment.amount.value}
              </p>
              {payment.status === 'paid' && payment.paidAt && (
                <p className="mt-1 text-xs text-green-600">
                  Betaald op{' '}
                  {format(new Date(payment.paidAt), 'd MMM', { locale: nl })}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const statusConfig: Record<string, { label: string; className: string }> = {
    paid: { label: 'Betaald', className: 'bg-green-100 text-green-800' },
    open: { label: 'Open', className: 'bg-blue-100 text-blue-800' },
    pending: {
      label: 'In behandeling',
      className: 'bg-yellow-100 text-yellow-800',
    },
    failed: { label: 'Mislukt', className: 'bg-red-100 text-red-800' },
    expired: { label: 'Verlopen', className: 'bg-gray-100 text-gray-800' },
    canceled: { label: 'Geannuleerd', className: 'bg-gray-100 text-gray-800' },
  }

  const config = statusConfig[status] || {
    label: status,
    className: 'bg-gray-100 text-gray-800',
  }

  return (
    <span
      className={`rounded-full px-2 py-1 text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  )
}

function getPaymentMethodName(method: string): string {
  const methods: Record<string, string> = {
    ideal: 'iDEAL',
    creditcard: 'Creditcard',
    bancontact: 'Bancontact',
    paypal: 'PayPal',
    sofort: 'SOFORT',
    banktransfer: 'Bankoverschrijving',
  }

  return methods[method] || method
}
