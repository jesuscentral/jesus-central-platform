'use client'

import { SbEvent } from '@storyblok/types/287435740670216/storyblok-components'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, MapPin, User, Clock, Youtube } from 'lucide-react'
import Button from '../ui/atoms/Button'
import EventBackground from './EventBackground'
import EventHeader from './EventHeader'
import EventInfoCard from './EventInfoCard'
import EventDescription from './EventDescription'
import AddToCalendarLink from './AddToCalendarLink'
import ShareDropdown from './ShareDropdown'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  event: SbEvent
  formattedDate: string
}

export default function EventDetailPage({ event, formattedDate }: Props) {
  // Extract time from date
  const eventDate = new Date(event.date)
  const eventTime = eventDate.toLocaleTimeString('nl-NL', {
    hour: '2-digit',
    minute: '2-digit',
  })

  const baseUrl =
    typeof window !== 'undefined'
      ? window.location.origin
      : process.env.NEXT_PUBLIC_BASE_URL || ''

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative h-screen w-screen overflow-hidden"
    >
      {/* Full Screen Background */}
      <EventBackground
        videoUrl={event.video?.filename}
        imageUrl={event.thumbnail?.filename}
        title={event.title}
      />

      {/* Back Button - Fixed Top Left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute top-4 left-4 z-50 md:top-6 md:left-6"
      >
        <Button
          type="strategy-red"
          variant="primary"
          href="/activiteiten"
          size="small"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Terug</span>
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
        className="absolute top-[4.5rem] left-1/2 z-20 -translate-x-1/2 sm:top-20"
      >
        <Link href="/">
          <div className="bg-boldness relative rounded-xl px-4 py-2 shadow-2xl sm:rounded-2xl sm:px-6 sm:py-3">
            <div className="relative h-12 w-32 sm:h-16 sm:w-48 md:h-20 md:w-64">
              <Image
                src="/logo.svg"
                alt="Jesus Central Church"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Action Buttons - Fixed Top Right */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute top-4 right-4 z-50 flex gap-2 md:top-6 md:right-6"
      >
        <ShareDropdown
          title={event.title}
          text={event.description || `${event.title} - Jesus Central Church`}
          url={typeof window !== 'undefined' ? window.location.href : ''}
        />
        {event.youtubeLink?.cached_url && (
          <Link
            href={event.youtubeLink.cached_url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-strategy-red text-freedom hover:bg-strategy-red/90 flex h-9 w-9 items-center justify-center rounded-lg transition-all hover:scale-105"
            aria-label="Bekijk video"
          >
            <Youtube className="h-4 w-4" />
          </Link>
        )}
      </motion.div>

      {/* Content Container - Centered */}
      <div className="relative z-10 flex h-full w-full items-center justify-center px-4 py-20 md:px-8">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
            {/* Left Column - Event Info */}
            <div className="flex flex-col gap-3">
              <EventHeader type={event.type} title={event.title} />

              {/* Info Cards Grid */}
              <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
                {/* Date with Calendar Action */}
                <EventInfoCard
                  icon={Calendar}
                  label="Datum"
                  value={formattedDate}
                  delay={0.4}
                  action={<AddToCalendarLink event={event} baseUrl={baseUrl} />}
                  className="col-span-2 lg:col-span-1"
                />

                {/* Time */}
                <EventInfoCard
                  icon={Clock}
                  label="Tijd"
                  value={eventTime}
                  delay={0.5}
                />

                {/* Location */}
                {event.location && (
                  <EventInfoCard
                    icon={MapPin}
                    label="Locatie"
                    value={event.location}
                    delay={0.6}
                  />
                )}

                {/* Speaker */}
                {event.speaker && (
                  <EventInfoCard
                    icon={User}
                    label="Spreker"
                    value={event.speaker}
                    delay={0.7}
                    className="col-span-2 lg:col-span-1"
                  />
                )}
              </div>
            </div>

            {/* Right Column - Description */}
            {event.description && (
              <EventDescription description={event.description} />
            )}
          </div>
        </div>
      </div>
    </motion.main>
  )
}
