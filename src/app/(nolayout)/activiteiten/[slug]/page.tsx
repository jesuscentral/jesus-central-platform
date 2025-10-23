'use server'

import EventDetailPage from '@/components/events/EventDetailPage'

import { getStory } from '@/features/storyblok'
import { SbEvent } from '@storyblok/types/287435740670216/storyblok-components'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const params = await props.params

  const story = await getStory(['activiteiten', params.slug])

  if (!story) {
    return {}
  }

  const event = story?.content as SbEvent | undefined

  if (!event) {
    return {}
  }

  const eventDate = new Date(event.date)
  const formattedDate = eventDate.toLocaleDateString('nl-NL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  })

  return {
    title: `${event.title} op ${formattedDate}`,
    description: event.description,
    openGraph: {
      title: `${event.title} - ${formattedDate}`,
      description: event.description,
      images: [
        {
          url: event.thumbnail?.filename ?? '/og-image.png',
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: `${event.title} op ${formattedDate}`,
      description: event.description,
      images: [
        {
          url: event.thumbnail?.filename ?? '/og-image.png',
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const story = await getStory(['activiteiten', slug])

  if (!story) {
    notFound()
  }

  const event = story?.content as SbEvent | undefined

  if (!event) {
    notFound()
  }

  // Format event date for display
  const eventDate = new Date(event.date)
  const formattedDate = eventDate.toLocaleDateString('nl-NL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  })

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    startDate: event.date,
    endDate: event.date,
    description: event.description,
    image: [event.thumbnail?.filename, event.preacherPicture?.filename],
    eventStatus: 'https://schema.org/EventScheduled',
    location: event.location,
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/activiteiten/${event.slug}`,
    performer: {
      '@type': 'Person',
      name: event.speaker,
    },
    organizer: {
      '@type': 'Organization',
      name: 'Jesus Central Church',
      url: 'https://jesuscentral.church',
    },
  }

  return (
    <>
      <EventDetailPage event={event} formattedDate={formattedDate} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
    </>
  )
}
