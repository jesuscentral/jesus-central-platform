'use client'

import { RssVideo } from '@/features/youtube'
import { motion } from 'framer-motion'
import { Play, CalendarDays } from 'lucide-react'
import Image from 'next/image'

function formatDate(value: string) {
  const d = new Date(value)
  return new Intl.DateTimeFormat('nl-NL', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(d)
}
export default function SermonCard({
  video,
  onOpen,
}: {
  video: RssVideo
  onOpen: (videoId: string) => void
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="group bg-boldness relative isolate overflow-hidden rounded-3xl border border-white/10 shadow-2xl"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          fill
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="from-boldness via-boldness/10 pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent" />
        <button
          onClick={() => onOpen(video.videoId)}
          className="bg-strategy-red absolute bottom-3 left-3 inline-flex cursor-pointer items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold text-white shadow"
        >
          <Play className="h-4 w-4" />
          Afspelen
        </button>
      </div>
      <div className="p-5 sm:p-6">
        <h3 className="text-freedom line-clamp-2 text-2xl tracking-wide sm:text-3xl">
          {video.title}
        </h3>
        <div className="text-freedom/70 mt-2 flex items-center gap-2 text-xs">
          <CalendarDays className="h-3.5 w-3.5" />
          <span>{formatDate(video.publishedAt)}</span>
        </div>
      </div>
      <div className="bg-strategy-red/15 pointer-events-none absolute -right-24 -bottom-24 h-56 w-56 rounded-full blur-3xl" />
    </motion.article>
  )
}
