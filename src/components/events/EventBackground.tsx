'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface EventBackgroundProps {
  videoUrl?: string
  imageUrl?: string
  title: string
}

export default function EventBackground({
  videoUrl,
  imageUrl,
  title,
}: EventBackgroundProps) {
  return (
    <div className="absolute inset-0">
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="h-full w-full"
      >
        {videoUrl ? (
          <video
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
            poster={imageUrl || '/og-image.png'}
          />
        ) : (
          <Image
            src={imageUrl || '/og-image.png'}
            alt={title}
            fill
            priority
            className="object-cover"
          />
        )}
      </motion.div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-boldness/70 via-boldness/50 to-boldness/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-boldness/60 via-transparent to-boldness/60" />
    </div>
  )
}
