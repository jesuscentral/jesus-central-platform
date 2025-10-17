"use client";

import { useState } from "react";
import { createNewSubscription } from "../actions/subscriptions";
import Button from "@/components/ui/atoms/Button";
import { useRouter } from "next/navigation";

interface NewSubscriptionFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function NewSubscriptionForm({
  onSuccess,
  onCancel,
}: NewSubscriptionFormProps) {
  const [formData, setFormData] = useState({
    amount: "10.00",
    interval: "1 month",
    description: "Maandelijkse gift",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await createNewSubscription(
      formData.amount,
      formData.interval,
      formData.description
    );

    setIsLoading(false);

    if (result.success) {
      if (result.requiresSetup && result.redirectUrl) {
        // Redirect to Mollie for first payment setup
        window.location.href = result.redirectUrl;
      } else {
        onSuccess();
      }
    } else {
      alert(result.error || "Failed to create subscription");
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-bold mb-4">
        Nieuw maandelijkse gift aanmaken
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Amount */}
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-2"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-orange focus:border-transparent"
            required
          />
        </div>

        {/* Interval */}
        <div>
          <label
            htmlFor="interval"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Frequentie
          </label>
          <select
            id="interval"
            value={formData.interval}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, interval: e.target.value }))
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-orange focus:border-transparent"
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
            className="block text-sm font-medium text-gray-700 mb-2"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-orange focus:border-transparent"
            required
          />
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
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
            {isLoading ? "Bezig..." : "Maandelijkse gift aanmaken"}
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
  );
}
