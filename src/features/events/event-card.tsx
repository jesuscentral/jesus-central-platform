'use client'
import { ISbStoryData } from '@storyblok/react'
import { SbEvent } from '@storyblok/types/287435740670216/storyblok-components'
import { motion } from 'framer-motion'
import {
  Mic2,
  Languages,
  Headphones,
  CalendarDays,
  ChevronRight,
  Ticket,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

function formatDateParts(d: string | Date) {
  const date = typeof d === 'string' ? new Date(d) : d
  const day = new Intl.DateTimeFormat('nl-NL', { day: '2-digit' }).format(date)
  const month = new Intl.DateTimeFormat('nl-NL', { month: 'short' }).format(
    date,
  )
  const weekday = new Intl.DateTimeFormat('nl-NL', { weekday: 'short' }).format(
    date,
  )
  const time = new Intl.DateTimeFormat('nl-NL', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
  return { day, month, weekday, time }
}

export default function EventCard({ event }: { event: ISbStoryData<SbEvent> }) {
  const { day, month, weekday, time } = formatDateParts(event.content.date)
  const isService = event.content.type === 'service'
  const typeColor = isService
    ? 'bg-strategy-red text-white'
    : 'bg-strategy-gold text-boldness'

  const card = (
    <Link href={event.full_slug}>
      <motion.article
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -2 }}
        className="group bg-boldness relative isolate flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 shadow-2xl"
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={event.content.thumbnail?.filename ?? '/og-image.png'}
            alt=""
            fill
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="from-boldness via-boldness/10 pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent" />
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <div
              className={`rounded-xl px-2 py-1 text-xs font-semibold tracking-wide uppercase ${typeColor}`}
            >
              {isService ? 'Dienst' : 'Event'}
            </div>
          </div>
          <div className="absolute top-4 right-4 grid h-16 w-16 place-items-center rounded-2xl border border-white/10 bg-white/10 backdrop-blur-sm">
            <div className="text-center leading-none">
              <div className="text-freedom/80 text-xs tracking-wide uppercase">
                {month}
              </div>
              <div className="text-freedom text-2xl font-bold">{day}</div>
              <div className="text-freedom/70 text-[10px] tracking-wide uppercase">
                {weekday}
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="text-freedom/70 mb-2 flex items-center gap-2 text-xs">
            <CalendarDays className="h-3.5 w-3.5" />
            <span>{time}</span>
            <span>•</span>
            <div
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 ${isService ? 'bg-strategy-red/15 text-strategy-red' : 'bg-strategy-gold/20 text-strategy-gold'}`}
            >
              <Ticket className="h-3 w-3" />
              <span className="uppercase">
                {isService ? 'Dienst' : 'Event'}
              </span>
            </div>
          </div>
          <h3 className="font-['TGS Perfect Condensed',Oswald,Impact,sans-serif] text-freedom line-clamp-2 text-2xl tracking-wide sm:text-3xl">
            {event.content.title}
          </h3>
          <small className="text-freedom/70 text-xs">
            {event.content.location}
          </small>
          <p className="font-['Fira Sans',system-ui,sans-serif] text-freedom/80 mt-2 line-clamp-3 text-sm leading-relaxed">
            {event.content.description}
          </p>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {event.content.speaker && (
              <div className="text-freedom flex items-center gap-2 text-sm">
                <Mic2 className="text-strategy-gold h-4 w-4" />
                <span className="truncate">{event.content.speaker}</span>
              </div>
            )}
            <div className="text-freedom flex items-center gap-2 text-sm">
              <Languages className="text-strategy-gold h-4 w-4" />
              <span className="truncate">{event.content.language}</span>
            </div>
            <div className="text-freedom flex items-center gap-2 text-sm">
              <Headphones
                className={`h-4 w-4 ${event.content.translationAvailable ? 'text-strategy-green' : 'text-freedom/40'}`}
              />
              <span
                className={
                  event.content.translationAvailable ? '' : 'text-freedom/60'
                }
              >
                {event.content.translationAvailable
                  ? 'Vertaling beschikbaar'
                  : 'Geen vertaling'}
              </span>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <div className="text-freedom/60 text-xs tracking-wide uppercase">
              {isService ? 'Samenkomst' : 'Activiteit'}
            </div>
            <div className="text-freedom inline-flex items-center gap-1 rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-sm transition-colors group-hover:border-white/20">
              <span>Meer info</span>
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  )

  return card
}
