'use client'

import { SbEvent } from '@storyblok/types/287435740670216/storyblok-components'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowLeft, Calendar, MapPin, User, Clock, Share2 } from 'lucide-react'
import Button from '../ui/atoms/Button'
import AddToCalendar from '../ui/molecules/AddToCalendar'
import ShareButton from '../ui/molecules/ShareButton'

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

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative h-screen w-screen overflow-hidden"
    >
      {/* Full Screen Background Image/Video */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="h-full w-full"
        >
          {event.video?.filename ? (
            <video
              src={event.video.filename}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
              poster={event.thumbnail?.filename || '/og-image.png'}
            />
          ) : (
            <Image
              src={event.thumbnail?.filename || '/og-image.png'}
              alt={event.title}
              fill
              priority
              className="object-cover"
            />
          )}
        </motion.div>

        {/* Gradient Overlays */}
        <div className="from-boldness/70 via-boldness/50 to-boldness/90 absolute inset-0 bg-gradient-to-b" />
        <div className="from-boldness/60 to-boldness/60 absolute inset-0 bg-gradient-to-r via-transparent" />
      </div>

      {/* Back Button - Fixed Top Left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute top-4 left-4 z-50 md:top-8 md:left-8"
      >
        <Button
          type="strategy-red"
          variant="primary"
          href="/activiteiten"
          size="medium"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Terug naar overzicht</span>
          <span className="sm:hidden">Terug</span>
        </Button>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
        className="absolute top-[4.5rem] left-1/2 z-20 -translate-x-1/2 sm:top-20"
      >
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
      </motion.div>

      {/* Content Container - Centered */}
      <div className="relative z-10 flex h-full w-full items-center justify-center">
        <div className="container mx-auto max-w-6xl px-4 py-4 md:px-8 md:py-8 lg:px-16">
          <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2 lg:gap-8">
            {/* Left Column - Event Info */}
            <div className="flex flex-col gap-4">
              {/* Type Badge & Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center lg:text-left"
              >
                {event.type && (
                  <div className="bg-strategy-gold text-boldness font-heading mb-2 inline-flex rounded-full px-4 py-1.5 text-[10px] font-bold tracking-wider uppercase shadow-lg md:mb-3 md:px-6 md:py-2 md:text-xs">
                    {event.type}
                  </div>
                )}
                <h1 className="font-heading text-freedom mb-3 text-2xl leading-tight font-bold tracking-wide uppercase drop-shadow-2xl md:mb-4 md:text-3xl lg:text-4xl">
                  {event.title}
                </h1>
              </motion.div>

              {/* Info Grid - 2 columns on mobile, stacked in left column */}
              <div className="grid grid-cols-2 gap-2 md:gap-3 lg:grid-cols-1">
                {/* Date */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-boldness/60 text-freedom flex items-center gap-2 rounded-lg p-3 shadow-lg backdrop-blur-md md:gap-3 md:rounded-xl md:p-4"
                >
                  <Calendar className="text-strategy-gold h-4 w-4 flex-shrink-0 md:h-5 md:w-5" />
                  <div>
                    <p className="font-body text-freedom/60 text-[9px] tracking-wider uppercase md:text-[10px]">
                      Datum
                    </p>
                    <p className="font-heading text-xs font-bold md:text-sm">
                      {formattedDate}
                    </p>
                  </div>
                </motion.div>

                {/* Time */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-boldness/60 text-freedom flex items-center gap-2 rounded-lg p-3 shadow-lg backdrop-blur-md md:gap-3 md:rounded-xl md:p-4"
                >
                  <Clock className="text-strategy-gold h-4 w-4 flex-shrink-0 md:h-5 md:w-5" />
                  <div>
                    <p className="font-body text-freedom/60 text-[9px] tracking-wider uppercase md:text-[10px]">
                      Tijd
                    </p>
                    <p className="font-heading text-xs font-bold md:text-sm">
                      {eventTime}
                    </p>
                  </div>
                </motion.div>

                {/* Location */}
                {event.location && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-boldness/60 text-freedom col-span-2 flex items-center gap-2 rounded-lg p-3 shadow-lg backdrop-blur-md md:gap-3 md:rounded-xl md:p-4 lg:col-span-1"
                  >
                    <MapPin className="text-strategy-gold h-4 w-4 flex-shrink-0 md:h-5 md:w-5" />
                    <div>
                      <p className="font-body text-freedom/60 text-[9px] tracking-wider uppercase md:text-[10px]">
                        Locatie
                      </p>
                      <p className="font-heading text-xs font-bold md:text-sm">
                        {event.location}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Speaker */}
                {event.speaker && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    className="bg-boldness/60 text-freedom col-span-2 flex items-center gap-2 rounded-lg p-3 shadow-lg backdrop-blur-md md:gap-3 md:rounded-xl md:p-4 lg:col-span-1"
                  >
                    <User className="text-strategy-gold h-4 w-4 flex-shrink-0 md:h-5 md:w-5" />
                    <div>
                      <p className="font-body text-freedom/60 text-[9px] tracking-wider uppercase md:text-[10px]">
                        Spreker
                      </p>
                      <p className="font-heading text-xs font-bold md:text-sm">
                        {event.speaker}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Right Column - Description & Actions */}
            <div className="flex flex-col gap-3 md:gap-4">
              {/* Description */}
              {event.description && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-boldness/60 text-freedom flex-1 overflow-y-auto rounded-xl p-4 shadow-lg backdrop-blur-md md:rounded-2xl md:p-6"
                >
                  <h2 className="font-heading text-strategy-gold mb-2 text-base font-bold tracking-wide uppercase md:mb-3 md:text-lg lg:text-xl">
                    Over dit evenement
                  </h2>
                  <p className="font-body text-freedom/80 text-xs leading-relaxed md:text-sm">
                    {event.description}
                  </p>
                </motion.div>
              )}

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex flex-col gap-2"
              >
                {/* Add to Calendar */}
                <AddToCalendar
                  event={event}
                  baseUrl={
                    typeof window !== 'undefined'
                      ? window.location.origin
                      : process.env.NEXT_PUBLIC_BASE_URL || ''
                  }
                  buttonType="strategy-gold"
                  buttonVariant="primary"
                  buttonSize="medium"
                  className="flex w-full items-center justify-center"
                />

                {/* Secondary Actions */}
                <div className="grid grid-cols-2 gap-2">
                  {/* YouTube Button */}
                  {event.youtubeLink?.cached_url && (
                    <Button
                      href={event.youtubeLink.cached_url}
                      type="strategy-red"
                      variant="primary"
                      size="small"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-1.5"
                    >
                      <svg
                        className="h-3.5 w-3.5 flex-shrink-0"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                      <span className="text-xs">Video</span>
                    </Button>
                  )}

                  {/* Share Button */}
                  <ShareButton
                    title={event.title}
                    text={
                      event.description ||
                      `${event.title} - Jesus Central Church`
                    }
                    url={
                      typeof window !== 'undefined' ? window.location.href : ''
                    }
                    buttonType="strategy-red"
                    buttonVariant="primary"
                    buttonSize="small"
                    className="flex w-full items-center justify-center"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  )
}
