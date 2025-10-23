import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import {
  storyblokEditable,
  StoryblokServerComponent,
} from '@storyblok/react/rsc'
import { getStoryblokApi, SbBlokData } from '@storyblok/react'
import type { ISbStoryData } from '@storyblok/react/rsc'
import type {
  SbEvent,
  SbEventHighlight,
  SbButton,
} from '@storyblok/types/287435740670216/storyblok-components'
import { getStoriesByUuids, linkResolver, storyblokApiConfig } from '../../api'
import { getLanguageConfig } from '../../utils'
import Section from '@/components/ui/atoms/Section'

interface EventHighlightProps {
  blok: SbEventHighlight
}

// Helper function to format event date
const formatEventDate = (dateString: string) => {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = date.toLocaleDateString('nl-NL', { month: 'long' })
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return { day, month, hours, minutes, time: `${hours}:${minutes}` }
}

// Helper function to get date filters for this week
const getThisWeekDateFilters = () => {
  const today = new Date()
  const nextWeek = new Date(today)
  nextWeek.setDate(today.getDate() + 7)

  return {
    gt_date: today.toISOString().split('T')[0],
    lt_date: nextWeek.toISOString().split('T')[0],
  }
}

// Fetch events for this week
async function fetchThisWeekEvents(): Promise<ISbStoryData<SbEvent>[]> {
  const storyblok = getStoryblokApi()
  const language = await getLanguageConfig()
  const dateFilters = getThisWeekDateFilters()

  const { data } = await storyblok.get('cdn/stories/', {
    ...storyblokApiConfig,
    content_type: 'event',
    language,
    filter_query: {
      date: dateFilters,
    },
    sort_by: 'content.date:asc',
  })

  return data.stories || []
}

// Event Card Component (extracted for readability)
function EventCard({ event }: { event: ISbStoryData<SbEvent> }) {
  const { day, month, time } = formatEventDate(event.content.date)
  const thumbnailSrc = event.content.thumbnail?.filename ?? '/og-image.png'

  return (
    <Link
      key={event.uuid}
      href={linkResolver(event.full_slug)}
      className="group flex items-center gap-6 transition-all hover:translate-x-2 md:gap-8"
    >
      {/* Date Display */}
      <div className="flex min-w-[80px] flex-col items-center md:min-w-[100px]">
        <span className="font-heading text-sm tracking-wide uppercase opacity-60 md:text-base">
          {day} {month}
        </span>
        <span className="font-heading text-4xl leading-none md:text-5xl">
          {time}
        </span>
      </div>

      {/* Event Details */}
      <div className="flex flex-1 flex-row justify-between gap-2 border-b pb-6">
        <div className="flex flex-col gap-2">
          <span className="font-heading text-xs tracking-widest uppercase opacity-60 md:text-sm">
            {event.content.type}
          </span>
          <h4 className="font-heading text-xl leading-tight md:text-2xl lg:text-3xl">
            {event.content.title}
          </h4>
          {event.content.speaker && (
            <small className="font-body text-xs tracking-widest opacity-60">
              Spreker: {event.content.speaker}
            </small>
          )}
        </div>
        <Image
          src={thumbnailSrc}
          alt={event.content.title ?? ''}
          width={100}
          height={100}
          className="rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Arrow */}
      <div className="flex items-center">
        <ArrowRight className="text-boldness h-6 w-6 transition-transform group-hover:translate-x-1 md:h-8 md:w-8" />
      </div>
    </Link>
  )
}

export default async function EventHighlight({ blok }: EventHighlightProps) {
  // Early return if no events configured
  if (!blok.showThisWeek && (!blok.events || blok.events.length === 0)) {
    return null
  }

  // Fetch events based on configuration
  const events = blok.showThisWeek
    ? await fetchThisWeekEvents()
    : await getStoriesByUuids(blok.events as string[])

  // Don't render if no events found
  if (events.length === 0) return null

  return (
    <Section
      {...storyblokEditable(blok as SbBlokData)}
      backgroundColor={blok.backgroundColor as string}
      color={blok.textColor as string}
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Header */}
          <div className="flex flex-col justify-start">
            <h2 className="font-heading mb-6 text-5xl tracking-wide uppercase md:text-6xl lg:text-7xl">
              {blok.title}
            </h2>
            <p className="font-body mb-8 text-lg leading-relaxed opacity-60 md:text-xl lg:mb-10">
              {blok.description}
            </p>
            {blok.button &&
              blok.button.length > 0 &&
              blok.button.map((button: SbButton) => (
                <StoryblokServerComponent key={button._uid} blok={button} />
              ))}
          </div>

          {/* Right Column - Events List */}
          <div className="flex flex-col">
            {/* Header */}
            <div className="border-strategy-blue mb-8 border-b-2 pb-4">
              <h3 className="font-heading text-sm tracking-widest uppercase md:text-base">
                ACTIVITEITEN
              </h3>
            </div>

            {/* Events */}
            <div className="flex flex-col gap-6">
              {events.map((event: ISbStoryData<SbEvent>) => (
                <EventCard key={event.uuid} event={event} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
