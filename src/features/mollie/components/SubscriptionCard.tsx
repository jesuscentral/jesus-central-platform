'use client'

import { useState } from 'react'
import type { SerializedSubscription } from '../types'
import { format } from 'date-fns'
import { nl } from 'date-fns/locale'
import {
  cancelSubscription,
  updateSubscriptionAmount,
} from '../actions/subscriptions'
import Button from '@/components/ui/atoms/Button'

interface SubscriptionCardProps {
  subscription: SerializedSubscription
  onUpdate: () => void
}

export function SubscriptionCard({
  subscription,
  onUpdate,
}: SubscriptionCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editAmount, setEditAmount] = useState(subscription.amount.value)
  const [isLoading, setIsLoading] = useState(false)
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)

  const handleCancel = async () => {
    setIsLoading(true)
    const result = await cancelSubscription(subscription.id)
    setIsLoading(false)

    if (result.success) {
      onUpdate()
    } else {
      alert(result.error || 'Failed to cancel subscription')
    }
    setShowCancelConfirm(false)
  }

  const handleUpdate = async () => {
    setIsLoading(true)
    const result = await updateSubscriptionAmount(
      subscription.id,
      editAmount,
      subscription.description,
    )
    setIsLoading(false)

    if (result.success) {
      setIsEditing(false)
      onUpdate()
    } else {
      alert(result.error || 'Failed to update subscription')
    }
  }

  const isActive = subscription.status === 'active'
  const isCanceled = subscription.status === 'canceled'

  return (
    <div
      className={`rounded-lg border-2 p-6 transition-all ${
        isActive ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
      }`}
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-gray-900">
              {subscription.description}
            </h3>
            <SubscriptionStatusBadge status={subscription.status} />
          </div>
          <p className="mt-1 text-sm text-gray-600">
            {getIntervalText(subscription.interval)}
          </p>
        </div>
        {isEditing ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">€</span>
              <input
                type="number"
                step="0.01"
                min="1"
                value={editAmount}
                onChange={(e) => setEditAmount(e.target.value)}
                className="focus:ring-brand-orange w-24 rounded-md border border-gray-300 px-3 py-1 focus:border-transparent focus:ring-2"
              />
            </div>
          </div>
        ) : (
          <p className="text-2xl font-bold text-gray-900">
            €{subscription.amount.value}
          </p>
        )}
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        {subscription.nextPaymentDate && (
          <p>
            <span className="font-medium">Volgende betaling:</span>{' '}
            {format(new Date(subscription.nextPaymentDate), 'd MMMM yyyy', {
              locale: nl,
            })}
          </p>
        )}
        {subscription.createdAt && (
          <p>
            <span className="font-medium">Gestart op:</span>{' '}
            {format(new Date(subscription.createdAt), 'd MMMM yyyy', {
              locale: nl,
            })}
          </p>
        )}
        {subscription.canceledAt && (
          <p className="text-red-600">
            <span className="font-medium">Geannuleerd op:</span>{' '}
            {format(new Date(subscription.canceledAt), 'd MMMM yyyy', {
              locale: nl,
            })}
          </p>
        )}
      </div>

      {isActive && !isCanceled && (
        <div className="mt-6 flex gap-2">
          {isEditing ? (
            <>
              <Button
                type="strategy-red"
                variant="primary"
                size="small"
                onClick={handleUpdate}
                disabled={isLoading}
              >
                {isLoading ? 'Bezig...' : 'Opslaan'}
              </Button>
              <Button
                type="strategy-red"
                variant="outline"
                size="small"
                onClick={() => {
                  setIsEditing(false)
                  setEditAmount(subscription.amount.value)
                }}
                disabled={isLoading}
              >
                Annuleren
              </Button>
            </>
          ) : (
            <>
              <Button
                type="strategy-red"
                variant="outline"
                size="small"
                onClick={() => setIsEditing(true)}
              >
                Bedrag aanpassen
              </Button>
              <Button
                type="strategy-red"
                variant="outline"
                size="small"
                onClick={() => setShowCancelConfirm(true)}
              >
                Opzeggen
              </Button>
            </>
          )}
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-4 max-w-md rounded-lg bg-white p-6">
            <h3 className="mb-2 text-lg font-bold">Abonnement opzeggen?</h3>
            <p className="mb-4 text-gray-600">
              Weet je zeker dat je dit abonnement wilt opzeggen? Dit kan niet
              ongedaan worden gemaakt.
            </p>
            <div className="flex justify-end gap-2">
              <Button
                type="strategy-red"
                variant="outline"
                size="small"
                onClick={() => setShowCancelConfirm(false)}
                disabled={isLoading}
              >
                Terug
              </Button>
              <Button
                type="strategy-red"
                variant="primary"
                size="small"
                onClick={handleCancel}
                disabled={isLoading}
              >
                {isLoading ? 'Bezig...' : 'Ja, opzeggen'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function SubscriptionStatusBadge({ status }: { status: string }) {
  const statusConfig: Record<string, { label: string; className: string }> = {
    active: { label: 'Actief', className: 'bg-green-100 text-green-800' },
    pending: {
      label: 'In behandeling',
      className: 'bg-yellow-100 text-yellow-800',
    },
    canceled: { label: 'Geannuleerd', className: 'bg-gray-100 text-gray-800' },
    suspended: {
      label: 'Opgeschort',
      className: 'bg-orange-100 text-orange-800',
    },
    completed: { label: 'Voltooid', className: 'bg-blue-100 text-blue-800' },
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

function getIntervalText(interval: string): string {
  const intervals: Record<string, string> = {
    '1 month': 'Maandelijks',
    '3 months': 'Elk kwartaal',
    '6 months': 'Halfjaarlijks',
    '12 months': 'Jaarlijks',
    '1 week': 'Wekelijks',
  }

  return intervals[interval] || interval
}
