'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/utils/cn'
import { SbEvent } from '@storyblok/types/287435740670216/storyblok-components'
import Link from 'next/link'
import { linkResolver } from '../../utils'
import { Calendar, Clock, MapPin, ArrowUpRight, Search, X } from 'lucide-react'

interface Props {
  events: SbEvent[]
}

// Format date helper
const formatEventDate = (dateString: string) => {
  const date = new Date(dateString)
  const month = date
    .toLocaleDateString('nl-NL', { month: 'short' })
    .toUpperCase()
  const day = date.getDate()
  const weekday = date.toLocaleDateString('nl-NL', { weekday: 'short' })
  const time = date.toLocaleTimeString('nl-NL', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return { month, day, weekday, time, fullDate: date }
}

export default function FilterableList({ events }: Props) {
  const [filter, setFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Get unique event types from data
  const filters = useMemo(() => {
    const types = new Set<string>()
    events.forEach((event) => {
      if (event.type) {
        types.add(event.type)
      }
    })
    return ['all', ...Array.from(types).sort()]
  }, [events])

  // --- Filter logic with search ---
  const filtered = useMemo(() => {
    let result = [...events]

    // Filter by type
    if (filter !== 'all') {
      result = result.filter((e) => e.type === filter)
    }

    // Filter by search query - trim to handle empty spaces
    const trimmedQuery = searchQuery.trim()
    if (trimmedQuery) {
      const query = trimmedQuery.toLowerCase()
      result = result.filter((event) => {
        return (
          event.title?.toLowerCase().includes(query) ||
          event.description?.toLowerCase().includes(query) ||
          event.location?.toLowerCase().includes(query) ||
          event.speaker?.toLowerCase().includes(query)
        )
      })
    }

    return result
  }, [filter, events, searchQuery])

  // Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section
      id="events-filtered"
      className="bg-freedom relative min-h-screen py-16 md:py-20 lg:py-24"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        {/* Filters and Search Bar Container */}
        <div className="mb-12 flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
            {filters.map((f) => (
              <motion.button
                key={f}
                onClick={() => setFilter(f)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  'font-heading cursor-pointer rounded-full border-2 px-6 py-3 text-sm tracking-widest uppercase transition-all',
                  filter === f
                    ? 'border-strategy-red bg-strategy-red text-freedom shadow-lg'
                    : 'border-boldness/20 bg-freedom text-boldness hover:border-strategy-red hover:bg-strategy-red/10',
                )}
              >
                {f === 'all' ? 'Alle Evenementen' : f}
              </motion.button>
            ))}
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full lg:w-auto lg:min-w-[400px]"
          >
            <div className="relative">
              <Search className="text-boldness/40 absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Zoek op titel, locatie of spreker..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="font-body text-boldness placeholder:text-boldness/40 border-boldness/20 focus:border-strategy-red focus:ring-strategy-red/20 w-full rounded-full border-2 bg-white py-3 pr-11 pl-11 text-sm transition-all focus:ring-2 focus:outline-none"
              />
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setSearchQuery('')}
                  className="text-boldness/60 hover:text-boldness absolute top-1/2 right-4 -translate-y-1/2 transition-colors"
                  aria-label="Wis zoekopdracht"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Events Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((event, index) => {
              const { month, day, weekday, time } = formatEventDate(event.date)

              return (
                <motion.div
                  key={event._uid}
                  variants={itemVariants}
                  layout
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  transition={{
                    layout: { duration: 0.3 },
                  }}
                >
                  <Link
                    href={linkResolver(event.slug as string)}
                    className="group block"
                  >
                    <motion.article
                      whileHover={{ y: -8 }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 20,
                      }}
                      className="relative flex h-[420px] flex-col overflow-hidden rounded-2xl shadow-xl transition-shadow duration-300 hover:shadow-2xl md:h-[450px]"
                    >
                      {/* Full Background Image */}
                      <div className="absolute inset-0">
                        {event.video?.filename ? (
                          <video
                            src={event.video.filename}
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            poster={
                              event.thumbnail?.filename || '/og-image.png'
                            }
                            onMouseEnter={(e) => e.currentTarget.play()}
                            onMouseLeave={(e) => {
                              e.currentTarget.pause()
                              e.currentTarget.currentTime = 0
                            }}
                          />
                        ) : (
                          <Image
                            src={event.thumbnail?.filename || '/og-image.png'}
                            alt={event.title ?? 'Event'}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        )}

                        {/* Gradient Overlay - stronger at bottom */}
                        <div className="from-boldness via-boldness/70 to-boldness/30 absolute inset-0 bg-gradient-to-t" />
                      </div>

                      {/* Content - positioned absolutely over background */}
                      <div className="relative z-10 flex h-full flex-col p-5">
                        {/* Top Section - Arrow Icon */}
                        <div className="flex justify-end">
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 45 }}
                            transition={{ type: 'spring', stiffness: 400 }}
                            className="bg-strategy-red flex h-9 w-9 items-center justify-center rounded-full shadow-lg md:h-10 md:w-10"
                          >
                            <ArrowUpRight className="text-freedom h-4 w-4 md:h-5 md:w-5" />
                          </motion.div>
                        </div>

                        {/* Bottom Section - Content */}
                        <div className="mt-auto">
                          {/* Date Badge */}
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-strategy-green mb-4 inline-flex flex-col items-center rounded-lg px-4 py-2.5 shadow-lg"
                          >
                            <span className="font-heading text-boldness text-xs font-bold tracking-wider uppercase">
                              {month}
                            </span>
                            <span className="font-heading text-boldness text-2xl leading-none font-bold">
                              {day}
                            </span>
                          </motion.div>

                          {/* Type Badge */}
                          {event.type && (
                            <div className="mb-3">
                              <span className="bg-strategy-gold/30 text-strategy-gold font-heading inline-flex items-center rounded-full px-4 py-1.5 text-xs font-bold tracking-wider uppercase backdrop-blur-sm">
                                {event.type}
                              </span>
                            </div>
                          )}

                          {/* Title */}
                          <h3 className="font-heading text-freedom mb-3 text-lg leading-tight font-bold tracking-wide uppercase md:text-xl">
                            {event.title}
                          </h3>

                          {/* Location */}
                          {event.location && (
                            <div className="text-freedom/90 mb-1.5 flex items-center gap-2 text-xs">
                              <MapPin className="h-3.5 w-3.5" />
                              <span className="font-body">
                                {event.location}
                              </span>
                            </div>
                          )}

                          {/* Date & Time */}
                          <div className="text-freedom/90 flex items-center gap-4 text-xs">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5" />
                              <span className="font-body">{weekday}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5" />
                              <span className="font-body">{time}</span>
                            </div>
                          </div>

                          {/* Speaker */}
                          {event.speaker && (
                            <p className="text-strategy-red font-body mt-2 text-xs font-medium">
                              Spreker: {event.speaker}
                            </p>
                          )}

                          {/* Hover indicator */}
                          <div className="text-strategy-red mt-3 flex items-center gap-2 text-xs font-semibold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <span className="font-heading tracking-wider uppercase">
                              Meer info
                            </span>
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  </Link>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-boldness/60 flex flex-col items-center justify-center gap-4 py-20 text-center"
          >
            <Search className="text-boldness/30 h-16 w-16" />
            <div>
              <p className="font-heading mb-2 text-xl uppercase">
                Geen evenementen gevonden
              </p>
              {searchQuery && (
                <p className="font-body text-boldness/50 text-sm">
                  Probeer een andere zoekterm of filter
                </p>
              )}
            </div>
            {(searchQuery || filter !== 'all') && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSearchQuery('')
                  setFilter('all')
                }}
                className="bg-strategy-red text-freedom font-heading hover:bg-strategy-red/90 mt-4 rounded-full px-8 py-3 text-sm tracking-wider uppercase transition-all"
              >
                Wis filters
              </motion.button>
            )}
          </motion.div>
        )}
      </div>
    </section>
  )
}
