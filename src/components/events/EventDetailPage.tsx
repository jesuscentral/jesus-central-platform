'use client'

import { SbEvent } from '@storyblok/types/287435740670216/storyblok-components'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowLeft, Calendar, MapPin, User } from 'lucide-react'
import Button from '../ui/atoms/Button'
import AddToCalendar from '../ui/molecules/AddToCalendar'
import ShareButton from '../ui/molecules/ShareButton'

interface Props {
  event: SbEvent
  formattedDate: string
}

export default function EventDetailPage({ event, formattedDate }: Props) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Video/Image Background with Ken Burns effect */}
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        className="absolute inset-0"
      >
        {event.video?.filename ? (
          <video
            src={event.video.filename}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover brightness-90 saturate-110"
            poster={event.thumbnail?.filename || '/og-image.png'}
          />
        ) : (
          <Image
            src={event.thumbnail?.filename || '/og-image.png'}
            alt={event.title}
            fill
            priority
            className="object-cover brightness-90 saturate-110"
          />
        )}
      </motion.div>

      {/* Cinematic Gradient Overlays - inspired by StoryScrollList */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"
        style={{ zIndex: 1 }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-[var(--strategy-red)]/30 via-transparent to-transparent"
        animate={{
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ zIndex: 2 }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="bg-gradient-radial absolute inset-0 from-transparent via-transparent to-black/70"
        style={{ zIndex: 3 }}
      />

      {/* Back Button - Top Left - Mobile Optimized */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute top-20 left-4 z-20 sm:top-24 sm:left-6 md:left-12"
      >
        <Button
          type="strategy-gold"
          variant="primary"
          href="/activiteiten"
          size="small"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Terug</span>
        </Button>
      </motion.div>

      {/* Church Logo - Top Center - Mobile Responsive */}
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

      {/* Event Type Badge - Mobile Optimized */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 300 }}
        className="absolute top-20 right-4 z-20 sm:top-24 sm:right-6 md:right-12"
      >
        <div className="relative">
          {/* Glow effect behind badge */}
          <div className="bg-strategy-gold relative rounded-full p-[2px] sm:p-[3px]">
            <div className="bg-strategy-gold rounded-full px-3 py-1.5 backdrop-blur-md sm:px-6 sm:py-3">
              <span className="text-boldness text-xs font-bold tracking-wider uppercase drop-shadow-lg sm:text-sm md:text-lg">
                <h3>{event.type || 'Event'}</h3>
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content - Bottom Center - Mobile Optimized */}
      <div className="absolute right-0 bottom-0 left-0 z-20 px-4 pb-6 sm:px-6 sm:pb-12 md:px-12">
        <div className="mx-auto max-w-4xl">
          {/* Speaker Section - Mobile Responsive */}
          {event.speaker && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
              className="mb-4 flex flex-col items-center sm:mb-6"
            >
              <div className="relative">
                {/* Glow effect */}
                <div className="bg-strategy-gold absolute inset-0 scale-150 blur-2xl" />
                <div className="bg-strategy-gold relative flex items-center gap-2 rounded-full px-4 py-2 sm:gap-3 sm:px-8 sm:py-4">
                  <User className="text-boldness h-5 w-5 flex-shrink-0 sm:h-6 sm:w-6" />
                  <div className="text-left">
                    <p className="text-freedom text-[10px] font-semibold tracking-wider uppercase sm:text-xs">
                      Spreker
                    </p>
                    <p className="text-boldness text-base font-bold drop-shadow-lg sm:text-lg md:text-xl">
                      {event.speaker}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Info Pills - Mobile Responsive */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, type: 'spring' }}
            className="mb-4 flex flex-wrap items-center justify-center gap-2 sm:mb-6 sm:gap-3"
          >
            {/* Date */}
            <div className="flex items-center gap-1.5 rounded-full border border-white/30 bg-white/15 px-3 py-2 shadow-lg backdrop-blur-md sm:gap-2 sm:px-5 sm:py-2.5">
              <Calendar className="h-4 w-4 flex-shrink-0 text-white sm:h-5 sm:w-5" />
              <span className="text-xs font-semibold whitespace-nowrap text-white sm:text-sm md:text-base">
                {formattedDate}
              </span>
            </div>

            {/* Location */}
            {event.location && (
              <div className="flex items-center gap-1.5 rounded-full border border-white/30 bg-white/15 px-3 py-2 shadow-lg backdrop-blur-md sm:gap-2 sm:px-5 sm:py-2.5">
                <MapPin className="h-4 w-4 flex-shrink-0 text-white sm:h-5 sm:w-5" />
                <span className="text-xs font-semibold whitespace-nowrap text-white sm:text-sm md:text-base">
                  {event.location}
                </span>
              </div>
            )}
          </motion.div>

          {/* Title - Mobile Responsive */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
            className="mb-3 px-2 text-center text-2xl leading-tight font-bold text-white drop-shadow-2xl sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl"
          >
            {event.title}
          </motion.h1>

          {/* Description - Mobile Responsive */}
          {event.description && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mx-auto mb-6 max-w-2xl px-2 text-center text-sm leading-relaxed text-white/80 sm:mb-8 sm:text-base md:text-lg"
            >
              {event.description}
            </motion.p>
          )}

          {/* CTA Buttons - Pixel Perfect Layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, type: 'spring', stiffness: 300 }}
            className="mx-auto flex w-full max-w-2xl flex-col items-stretch justify-center gap-3 px-2 sm:items-center sm:gap-4"
          >
            {/* Primary Action - Add to Calendar (Full width on mobile) */}
            <div className="w-full sm:w-auto">
              <AddToCalendar
                event={event}
                baseUrl={
                  typeof window !== 'undefined'
                    ? window.location.origin
                    : process.env.NEXT_PUBLIC_BASE_URL || ''
                }
                buttonType="strategy-gold"
                buttonVariant="primary"
                buttonSize="large"
                className="w-full sm:w-auto"
              />
            </div>

            {/* Secondary Actions Row - Side by side on mobile */}
            <div className="flex w-full flex-row items-center justify-center gap-3 sm:w-auto">
              {/* YouTube Button */}
              {event.youtubeLink?.cached_url && (
                <div className="flex-1 sm:flex-initial">
                  <Button
                    href={event.youtubeLink.cached_url}
                    type="strategy-red"
                    variant="primary"
                    size="large"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full whitespace-nowrap sm:w-auto"
                  >
                    <svg
                      className="h-5 w-5 flex-shrink-0 sm:h-6 sm:w-6"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    <span className="hidden sm:inline">Bekijk op YouTube</span>
                    <span className="sm:hidden">YouTube</span>
                  </Button>
                </div>
              )}

              {/* Share Button */}
              <div className="flex-1 sm:flex-initial">
                <ShareButton
                  title={event.title}
                  text={
                    event.description || `${event.title} - Jesus Central Church`
                  }
                  url={
                    typeof window !== 'undefined' ? window.location.href : ''
                  }
                  buttonType="strategy-red"
                  buttonVariant="primary"
                  buttonSize="large"
                  className="w-full sm:w-auto"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Shine effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{
          x: ['-100%', '200%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 4,
          ease: 'easeInOut',
        }}
        style={{ zIndex: 25 }}
      />
    </motion.main>
  )
}
