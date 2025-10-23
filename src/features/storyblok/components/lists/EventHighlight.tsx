import Link from 'next/link'
import { cn } from '@/utils/cn'
import { ArrowRight } from 'lucide-react'
import {
  SbEvent,
  SbEventHighlight,
} from '@storyblok/types/287435740670216/storyblok-components'
import { getStoriesByUuids, linkResolver, storyblokApiConfig } from '../../api'
import {
  ISbStoryData,
  storyblokEditable,
  StoryblokServerComponent,
} from '@storyblok/react/rsc'
import { getStoryblokApi, SbBlokData } from '@storyblok/react'
import { SbButton } from '@storyblok/types/287435740670216/storyblok-components'
import { getLanguageConfig } from '../../utils'
import Image from 'next/image'

export interface EventItem {
  id: string
  month: string
  day: string
  category: string
  title: string
  link: string
}

interface EventsListProps {
  blok: SbEventHighlight
}

export default async function EventsList({ blok }: EventsListProps) {
  if (blok.events?.length === 0 && !blok.showThisWeek) return null

  let events: ISbStoryData<SbEvent>[] = []

  if (blok.showThisWeek) {
    const storyblok = getStoryblokApi()
    const language = await getLanguageConfig()
    const { data: eventsData } = await storyblok.get('cdn/stories/', {
      ...storyblokApiConfig,
      content_type: 'event',
      language,
      filter_query: {
        date: {
          gt_date: new Date().toISOString().split('T')[0], // only events today or later
          lt_date: new Date(new Date().setDate(new Date().getDate() + 7))
            .toISOString()
            .split('T')[0], // only events this week
        },
      },
      sort_by: 'content.date:asc',
    })
    const { stories: eventStories } = eventsData

    events = eventStories
  } else {
    events = await getStoriesByUuids(blok.events as string[])
  }

  return (
    <section
      {...storyblokEditable(blok as SbBlokData)}
      className={cn('bg-freedom py-16 md:py-20 lg:py-24')}
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Header */}
          <div className="flex flex-col justify-start">
            <h2 className="font-heading text-boldness mb-6 text-5xl tracking-wide uppercase md:text-6xl lg:text-7xl">
              {blok.title}
            </h2>
            <p className="font-body text-boldness/80 mb-8 text-lg leading-relaxed md:text-xl lg:mb-10">
              {blok.description}
            </p>
            {blok.button &&
              blok.button.length > 0 &&
              blok.button.map((button: SbButton) => (
                <StoryblokServerComponent
                  key={button._uid}
                  blok={button}
                  className="group flex items-center gap-6 transition-all hover:translate-x-2 md:gap-8"
                />
              ))}
          </div>

          {/* Right Column - Events List */}
          <div className="flex flex-col">
            {/* Header */}
            <div className="border-strategy-blue mb-8 border-b-2 pb-4">
              <h3 className="font-heading text-boldness text-sm tracking-widest uppercase md:text-base">
                ACTIVITEITEN
              </h3>
            </div>

            {/* Events */}
            <div className="flex flex-col gap-6">
              {events.map((event: ISbStoryData<SbEvent>) => (
                <Link
                  key={event.uuid}
                  href={linkResolver(event.full_slug)}
                  className="group flex items-center gap-6 transition-all hover:translate-x-2 md:gap-8"
                >
                  <div className="flex min-w-[80px] flex-col items-center md:min-w-[100px]">
                    <span className="font-heading text-boldness/60 text-sm tracking-wide uppercase md:text-base">
                      {new Date(event.content.date).getDate()}{' '}
                      {new Date(event.content.date).toLocaleDateString(
                        'nl-NL',
                        { month: 'long' },
                      )}
                    </span>
                    <span className="font-heading text-boldness text-4xl leading-none md:text-5xl">
                      {new Date(event.content.date)
                        .getHours()
                        .toString()
                        .padStart(2, '0')}
                      :
                      {new Date(event.content.date)
                        .getMinutes()
                        .toString()
                        .padStart(2, '0')}
                    </span>
                  </div>

                  <div className="border-boldness/20 flex flex-1 flex-row justify-between gap-2 border-b pb-6">
                    <div className="flex flex-col gap-2">
                      <span className="font-heading text-boldness/60 text-xs tracking-widest uppercase md:text-sm">
                        {event.content.type}
                      </span>
                      <h4 className="font-heading text-boldness text-xl leading-tight md:text-2xl lg:text-3xl">
                        {event.content.title}
                      </h4>
                      {event.content.speaker && (
                        <small className="font-body text-boldness/60 text-xs tracking-widest">
                          Spreker: {event.content.speaker}
                        </small>
                      )}
                    </div>
                    <Image
                      src={event.content.thumbnail?.filename ?? '/og-image.png'}
                      alt={event.content.title ?? ''}
                      width={100}
                      height={100}
                      className="rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex items-center">
                    <ArrowRight className="text-boldness h-6 w-6 transition-transform group-hover:translate-x-1 md:h-8 md:w-8" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
