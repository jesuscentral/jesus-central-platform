'use server'

import { getStoryblokApi, storyblokApiConfig } from '@/features/storyblok/api'
import {
  SbEvent,
  SbEventList,
} from '@storyblok/types/287435740670216/storyblok-components'
import { SbBlokData, storyblokEditable } from '@storyblok/react/rsc'
import { cn } from '@/utils/cn'
import { getLanguageConfig } from '../../utils'
import StoryScrollList from './StoryScrollList'
import { Heading } from '@/components/ui/atoms/Heading'
import FilterableList from './FilterableList'

export default async function EventList({ blok }: { blok: SbEventList }) {
  const storyblok = getStoryblokApi()
  const language = await getLanguageConfig()

  const { data: eventsData } = await storyblok.get('cdn/stories/', {
    ...storyblokApiConfig,
    starts_with: `${process.env.NEXT_PUBLIC_BASE_PATH}/activiteiten/`,
    language,
    filter_query: {
      date: {
        gte: new Date().toISOString(), // only events todday or later
      },
    },
    sort_by: 'content.date:asc',
  })

  const { stories: events } = eventsData

  const eventsContent = events.map((event: SbBlokData) => {
    const { full_slug, content } = event
    return {
      ...(typeof content === 'object' && content !== null ? content : {}),
      slug: full_slug,
    }
  })

  const eventsThisWeek = eventsContent.filter((event: SbEvent) => {
    const date = new Date(event.date)
    return (
      date >= new Date() &&
      date <= new Date(new Date().setDate(new Date().getDate() + 7))
    )
  })

  return (
    <>
      {blok.showStoryScroll && (
        <section
          {...storyblokEditable(blok as SbBlokData)}
          className={cn(
            'relative overflow-hidden',
            `bg-${blok.backgroundColor}`,
          )}
          {...storyblokEditable(blok as SbBlokData)}
        >
          <StoryScrollList events={eventsThisWeek} />
        </section>
      )}
      <section
        {...storyblokEditable(blok as SbBlokData)}
        className={cn(
          'relative overflow-hidden',
          `bg-${blok.backgroundColor}`,
          'py-12',
        )}
        {...storyblokEditable(blok as SbBlokData)}
      >
        <div className="container mx-auto px-4">
          <Heading variant="h2" className={cn(`text-${blok.textColor}`)}>
            {blok.title || 'Aankomende evenementen'}
          </Heading>
          <FilterableList events={eventsContent} />
        </div>
      </section>
    </>
  )
}
