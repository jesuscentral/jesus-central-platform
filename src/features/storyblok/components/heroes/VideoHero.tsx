'use client'

import { storyblokEditable, SbBlokData } from '@storyblok/react'
import { SbVideoHero } from '@storyblok/types/287435740670216/storyblok-components'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { StoryblokServerComponent } from '@storyblok/react/rsc'

interface VideoHeroProps {
  blok: SbVideoHero & SbBlokData
}

export default function VideoHero({ blok }: VideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [videoError, setVideoError] = useState(false)

  useEffect(() => {
    // Attempt to autoplay muted background video on supported browsers
    const v = videoRef.current
    if (!v) return

    // Set up intersection observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            v.load()
            v.play().catch(() => {
              /* ignore autoplay blocks */
            })
          }
        })
      },
      { threshold: 0.25 },
    )

    observer.observe(v)

    return () => {
      observer.disconnect()
    }
  }, [])

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
    },
  }

  return (
    <div
      {...storyblokEditable(blok as SbBlokData)}
      className="relative h-[80vh] w-full overflow-hidden rounded-b-2xl"
    >
      <div className="absolute inset-0">
        {/* Background video with optimizations */}
        {blok.background_video &&
          blok.background_video.filename &&
          !videoError && (
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              muted
              loop
              playsInline
              preload="metadata"
              poster={blok.fallback_image.filename!}
              onError={() => setVideoError(true)}
            >
              <source
                src={blok.background_video?.filename ?? '/videoclip-short.mp4'}
                type="video/mp4"
              />
            </video>
          )}

        {/* Fallback image if video fails */}
        {videoError && (
          <Image
            src={blok.fallback_image.filename!}
            alt={blok.fallback_image.alt || 'Video fallback'}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-end">
        <div className="p-6 md:p-12">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="font-heading text-jcc-freedom text-5xl tracking-tight md:text-7xl"
            style={{ letterSpacing: '0.02em' }}
          >
            {blok.title}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.15, duration: 0.6 },
            }}
            className="text-jcc-freedom/90 font-body mt-4 max-w-2xl text-lg md:text-xl"
          >
            {blok.subtitle}
          </motion.p>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.3, duration: 0.6 },
            }}
            className="mt-8 flex flex-wrap gap-3"
          >
            {blok.buttons && blok.buttons.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex w-full flex-col items-stretch gap-4 pt-2 sm:w-auto sm:flex-row"
              >
                {blok.buttons.map((button) => (
                  <StoryblokServerComponent blok={button} key={button._uid} />
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
