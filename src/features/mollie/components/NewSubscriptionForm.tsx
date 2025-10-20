'use client'

import { useState } from 'react'
import { createNewSubscription } from '../actions/subscriptions'
import Button from '@/components/ui/atoms/Button'

interface NewSubscriptionFormProps {
  onSuccess: () => void
  onCancel: () => void
}

export function NewSubscriptionForm({
  onSuccess,
  onCancel,
}: NewSubscriptionFormProps) {
  const [formData, setFormData] = useState({
    amount: '10.00',
    interval: '1 month',
    description: 'Maandelijkse gift',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const result = await createNewSubscription(
      formData.amount,
      formData.interval,
      formData.description,
    )

    setIsLoading(false)

    if (result.success) {
      if (result.requiresSetup && result.redirectUrl) {
        // Redirect to Mollie for first payment setup
        window.location.href = result.redirectUrl
      } else {
        onSuccess()
      }
    } else {
      alert(result.error || 'Failed to create subscription')
    }
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h3 className="mb-4 text-lg font-bold">
        Nieuw maandelijkse gift aanmaken
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Amount */}
        <div>
          <label
            htmlFor="amount"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Bedrag (€)
          </label>
          <input
            type="number"
            id="amount"
            step="0.01"
            min="1"
            value={formData.amount}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, amount: e.target.value }))
            }
            className="focus:ring-brand-orange w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2"
            required
          />
        </div>

        {/* Interval */}
        <div>
          <label
            htmlFor="interval"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Frequentie
          </label>
          <select
            id="interval"
            value={formData.interval}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, interval: e.target.value }))
            }
            className="focus:ring-brand-orange w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2"
            required
          >
            <option value="1 month">Maandelijks</option>
            <option value="3 months">Elk kwartaal</option>
            <option value="6 months">Halfjaarlijks</option>
            <option value="12 months">Jaarlijks</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Beschrijving
          </label>
          <input
            type="text"
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            className="focus:ring-brand-orange w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2"
            required
          />
        </div>

        {/* Info Box */}
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm text-blue-900">
            <strong>Let op:</strong> Als je nog geen eerdere gift hebt gedaan,
            word je doorgestuurd naar Mollie om je eerste betaling te voltooien.
            Hiermee wordt je maandelijkse gift opgezet.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            type="strategy-red"
            variant="primary"
            size="medium"
            disabled={isLoading}
          >
            {isLoading ? 'Bezig...' : 'Maandelijkse gift aanmaken'}
          </Button>
          <Button
            type="strategy-red"
            variant="outline"
            size="medium"
            onClick={onCancel}
            disabled={isLoading}
          >
            Annuleren
          </Button>
        </div>
      </form>
    </div>
  )
}
