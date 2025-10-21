'use client'

import { motion } from 'framer-motion'
import { Play, Youtube, CalendarDays, Mic2, Clock } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/utils/cn'
import Image from 'next/image'

interface SermonHighlightProps {
  primaryColor?: string
  secondaryColor?: string
  youtubeUrl: string
  thumbnail: {
    src: string
    alt?: string
  }
  title: string
  speaker?: string
  date: string | Date
  duration?: string
  series?: string
  language?: string
  translationAvailable?: boolean
  playButtonText?: string
  watchButtonText?: string
  badgeText?: string
  seriesLabel?: string
  languageLabel?: string
  translationAvailableText?: string
  translationNotAvailableText?: string
  className?: string
}

function formatDate(d: string | Date) {
  const date = typeof d === 'string' ? new Date(d) : d
  return new Intl.DateTimeFormat('nl-NL', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export default function SermonHighlight({
  primaryColor = 'white',
  secondaryColor = 'boldness',
  youtubeUrl,
  thumbnail,
  title,
  speaker,
  date,
  duration,
  series,
  language,
  translationAvailable,
  playButtonText = 'Bekijk de preek',
  watchButtonText = 'Watch on YouTube',
  badgeText = 'Laatste preek',
  seriesLabel = 'Serie:',
  languageLabel = 'Taal:',
  translationAvailableText = 'Vertaling beschikbaar',
  translationNotAvailableText = 'Geen vertaling',
  className,
}: SermonHighlightProps) {
  // CSS custom properties for dynamic theming
  // This approach works with Tailwind's JIT compiler
  const themeStyles = {
    '--sermon-primary': `var(--${primaryColor})`,
    '--sermon-secondary': `var(--${secondaryColor})`,
  } as React.CSSProperties

  return (
    <div
      className={cn(
        'grid items-stretch gap-4 sm:gap-6 md:grid-cols-12 md:gap-8',
        className,
      )}
      style={themeStyles}
    >
      {/* Thumbnail with Play Button */}
      <motion.a
        href={youtubeUrl}
        target="_blank"
        rel="noreferrer"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        whileHover={{ y: -4 }}
        className="group border-boldness/10 bg-boldness relative col-span-12 overflow-hidden rounded-2xl border shadow-xl sm:rounded-[2rem] sm:shadow-2xl md:col-span-7"
      >
        {/* Mobile-friendly aspect ratio */}
        <motion.div
          initial={{ scale: 1.02 }}
          animate={{ scale: 1.02 }}
          whileHover={{ scale: 1.07 }}
          transition={{ duration: 0.8 }}
          className="relative aspect-video h-full w-full sm:aspect-[21/9]"
        >
          <Image
            src={thumbnail.src}
            alt={thumbnail.alt || ''}
            fill
            quality={90}
            priority
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 grid place-items-center p-2 sm:p-3">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2 py-1.5 backdrop-blur-md sm:gap-2 sm:px-3 sm:py-2">
            <div className="bg-strategy-red grid h-8 w-8 place-items-center rounded-full shadow-xl transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
              <Play className="h-4 w-4 text-white sm:h-5 sm:w-5" />
            </div>
            <span className="text-xs text-white/95 sm:text-sm">
              {playButtonText}
            </span>
          </div>
        </div>
      </motion.a>

      {/* Sermon Details Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="col-span-12 flex flex-col justify-center gap-3 rounded-2xl border bg-white/70 p-4 backdrop-blur-sm sm:gap-4 sm:rounded-[2rem] sm:p-6 md:col-span-5 md:gap-5 md:p-8"
        style={{
          backgroundColor: 'var(--sermon-primary)',
          borderColor:
            'color-mix(in srgb, var(--sermon-secondary) 10%, transparent)',
        }}
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2">
          <span
            className="rounded-md px-2 py-0.5 text-xs font-semibold tracking-wider uppercase sm:px-2.5 sm:py-1 sm:text-sm"
            style={{
              backgroundColor: 'var(--sermon-secondary)',
              color: 'var(--sermon-primary)',
            }}
          >
            {badgeText}
          </span>
        </div>

        {/* Title */}
        <h2
          className="text-2xl leading-tight tracking-wide sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
          style={{ color: 'var(--sermon-secondary)' }}
        >
          {title}
        </h2>

        {/* Metadata (Speaker, Date, Duration) */}
        <div
          className="flex flex-col items-start gap-2 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 sm:text-base"
          style={{
            color:
              'color-mix(in srgb, var(--sermon-secondary) 85%, transparent)',
          }}
        >
          {speaker && (
            <div className="inline-flex items-center gap-1.5">
              <Mic2
                className="h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5"
                style={{ color: 'var(--sermon-secondary)' }}
              />
              <span style={{ color: 'var(--sermon-secondary)' }}>
                {speaker}
              </span>
            </div>
          )}

          <div className="inline-flex items-center gap-1.5">
            <CalendarDays
              className="h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5"
              style={{ color: 'var(--sermon-secondary)' }}
            />
            <span style={{ color: 'var(--sermon-secondary)' }}>
              {formatDate(date)}
            </span>
          </div>

          {duration && (
            <>
              <span
                className="hidden sm:inline"
                style={{ color: 'var(--sermon-secondary)' }}
              >
                •
              </span>
              <div className="inline-flex items-center gap-1.5">
                <Clock
                  className="h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5"
                  style={{ color: 'var(--sermon-secondary)' }}
                />
                <span style={{ color: 'var(--sermon-secondary)' }}>
                  {duration}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Series */}
        {series && (
          <div
            className="text-xs tracking-wide uppercase"
            style={{
              color:
                'color-mix(in srgb, var(--sermon-secondary) 60%, transparent)',
            }}
          >
            {seriesLabel} {series}
          </div>
        )}

        {/* Language & Translation Tags */}
        <div
          className="flex flex-wrap items-center gap-2 text-xs"
          style={{
            color:
              'color-mix(in srgb, var(--sermon-secondary) 70%, transparent)',
          }}
        >
          {language && (
            <span
              className="rounded-full border px-2 py-0.5 sm:px-2.5 sm:py-1"
              style={{
                borderColor:
                  'color-mix(in srgb, var(--sermon-secondary) 10%, transparent)',
                backgroundColor:
                  'color-mix(in srgb, var(--sermon-secondary) 80%, transparent)',
              }}
            >
              {languageLabel} {language}
            </span>
          )}

          {translationAvailable !== undefined && (
            <span
              className="rounded-full border px-2 py-0.5 sm:px-2.5 sm:py-1"
              style={{
                borderColor:
                  'color-mix(in srgb, var(--sermon-secondary) 10%, transparent)',
                backgroundColor:
                  'color-mix(in srgb, var(--sermon-secondary) 5%, transparent)',
                color:
                  'color-mix(in srgb, var(--sermon-secondary) 70%, transparent)',
              }}
            >
              {translationAvailable
                ? translationAvailableText
                : translationNotAvailableText}
            </span>
          )}
        </div>

        {/* YouTube Button */}
        <div className="pt-2">
          <Link
            href={youtubeUrl}
            target="_blank"
            rel="noreferrer"
            className="group bg-strategy-red inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold tracking-wide text-white shadow-lg transition-transform hover:scale-[1.015] hover:shadow-2xl sm:w-auto sm:justify-start sm:gap-3 sm:rounded-2xl sm:px-6 sm:py-4 sm:text-base sm:shadow-xl md:text-lg"
          >
            <Youtube className="h-5 w-5 sm:h-6 sm:w-6" />
            <span>{watchButtonText}</span>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
