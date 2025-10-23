'use client'

import { CalendarPlus } from 'lucide-react'
import { eventToICSData, downloadICS } from '@/lib/calendar'
import type { SbEvent } from '@storyblok/types/287435740670216/storyblok-components'

interface AddToCalendarLinkProps {
  event: SbEvent
  baseUrl: string
}

export default function AddToCalendarLink({
  event,
  baseUrl,
}: AddToCalendarLinkProps) {
  const handleAddToCalendar = () => {
    try {
      const icsData = eventToICSData(event, baseUrl)
      downloadICS(icsData)
    } catch (error) {
      console.error('Failed to generate calendar event:', error)
    }
  }

  return (
    <button
      onClick={handleAddToCalendar}
      className="bg-strategy-gold text-boldness hover:bg-strategy-gold/90 flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg transition-all hover:scale-110"
      aria-label="Toevoegen aan kalender"
      title="Toevoegen aan kalender"
    >
      <CalendarPlus className="h-3.5 w-3.5" />
    </button>
  )
}
