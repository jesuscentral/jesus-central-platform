'use client'

import { useState } from 'react'
import { createEvent } from '../../actions'
import type {
  CreateEventFormData,
  EventSelectedAssets,
} from '../../types/events'
import { AssetSelector } from '@/features/storyblok-management/components/asset-selector'
import Button from '@/components/ui/atoms/Button'
import { formatDateForInput } from '../../utils/formatters'

/**
 * Form for creating new events in Storyblok
 */
export function CreateEventForm() {
  const [formData, setFormData] = useState<CreateEventFormData>({
    title: '',
    description: '',
    date: formatDateForInput(new Date()),
    speaker: '',
    location: 'Rijsselseweg 1, 2803PZ Gouda',
    type: 'event',
    language: 'Nederlands',
    translationAvailable: false,
    youtubeLink: '',
  })

  const [selectedAssets, setSelectedAssets] = useState<EventSelectedAssets>({})

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{
    success: boolean
    message: string
  } | null>(null)

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitResult(null)

    try {
      const result = await createEvent(formData, selectedAssets)

      if (result.success) {
        setSubmitResult({
          success: true,
          message: `Event created successfully! Story ID: ${result.storyId}`,
        })
        // Reset form
        setFormData({
          title: '',
          description: '',
          date: '',
          speaker: '',
          location: '',
          type: '',
          language: '',
          translationAvailable: false,
          youtubeLink: '',
        })
        setSelectedAssets({})
        // Reset file inputs
        const form = e.target as HTMLFormElement
        form.reset()
      } else {
        setSubmitResult({
          success: false,
          message: `Failed to create event: ${result.error}`,
        })
      }
    } catch (error) {
      setSubmitResult({
        success: false,
        message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6 p-6">
      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Titel <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          value={formData.title}
          onChange={handleInputChange}
          className="focus:ring-brand-orange w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2"
        />
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Omschrijving <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          required
          value={formData.description}
          onChange={handleInputChange}
          rows={4}
          className="focus:ring-brand-orange w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2"
        />
      </div>

      {/* Date */}
      <div>
        <label
          htmlFor="date"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Datum <span className="text-red-500">*</span>
        </label>
        <input
          type="datetime-local"
          id="date"
          name="date"
          required
          value={formData.date}
          onChange={handleInputChange}
          className="focus:ring-brand-orange w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2"
        />
      </div>

      {/* Speaker */}
      <div>
        <label
          htmlFor="speaker"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Spreker
        </label>
        <input
          type="text"
          id="speaker"
          name="speaker"
          value={formData.speaker}
          onChange={handleInputChange}
          className="focus:ring-brand-orange w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2"
        />
      </div>

      {/* Location */}
      <div>
        <label
          htmlFor="location"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Locatie
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          className="focus:ring-brand-orange w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2"
        />
      </div>

      {/* Type */}
      <div>
        <label
          htmlFor="type"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Soort
        </label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          className="focus:ring-brand-orange w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2"
        >
          <option value="">Select type</option>
          <option value="service">Service</option>
          <option value="event">Event</option>
        </select>
      </div>

      {/* Language */}
      <div>
        <label
          htmlFor="language"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Taal
        </label>
        <select
          id="language"
          name="language"
          value={formData.language}
          onChange={handleInputChange}
          className="focus:ring-brand-orange w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2"
        >
          <option value="">Select language</option>
          <option value="Nederlands">Nederlands</option>
          <option value="Engels">Engels</option>
        </select>
      </div>

      {/* Translation Available */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="translationAvailable"
          name="translationAvailable"
          checked={formData.translationAvailable}
          onChange={handleInputChange}
          className="text-brand-orange focus:ring-brand-orange h-4 w-4 rounded border-gray-300"
        />
        <label
          htmlFor="translationAvailable"
          className="ml-2 block text-sm text-gray-700"
        >
          Vertaling beschikbaar
        </label>
      </div>

      {/* YouTube Link */}
      <div>
        <label
          htmlFor="youtubeLink"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          YouTube Link
        </label>
        <input
          type="url"
          id="youtubeLink"
          name="youtubeLink"
          value={formData.youtubeLink}
          onChange={handleInputChange}
          placeholder="https://youtube.com/watch?v=..."
          className="focus:ring-brand-orange w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2"
        />
      </div>

      {/* Thumbnail - Asset Selector */}
      <AssetSelector
        label="Thumbnail afbeelding"
        selectedAssetId={selectedAssets.thumbnailAssetId}
        onSelect={(assetId) =>
          setSelectedAssets((prev) => ({ ...prev, thumbnailAssetId: assetId }))
        }
        folderName="public_events"
      />

      {/* Submit Result */}
      {submitResult && (
        <div
          className={`rounded-md p-4 ${
            submitResult.success
              ? 'bg-green-50 text-green-800'
              : 'bg-red-50 text-red-800'
          }`}
        >
          {submitResult.message}
        </div>
      )}

      {/* Submit Button */}
      <div className="flex gap-4">
        <Button
          type="strategy-red"
          variant="primary"
          size="medium"
          disabled={isSubmitting}
          className="flex-1"
        >
          {isSubmitting ? 'Activiteit aanmaken...' : 'Activiteit aanmaken'}
        </Button>
      </div>
    </form>
  )
}
