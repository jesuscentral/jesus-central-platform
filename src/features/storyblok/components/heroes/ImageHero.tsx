'use client'

import { storyblokEditable, SbBlokData } from '@storyblok/react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { StoryblokServerComponent } from '@storyblok/react/rsc'
import { SbImageHero } from '@storyblok/types/287435740670216/storyblok-components'
import { cn } from '@/utils/cn'

// Define the ImageHero type based on VideoHero structure
interface ImageHeroProps {
  blok: SbImageHero & SbBlokData
}

export default function ImageHero({ blok }: ImageHeroProps) {
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
      className={cn('relative h-[80vh] w-full overflow-hidden rounded-b-2xl')}
    >
      <div className="absolute inset-0">
        <Image
          src={blok.image.filename!}
          alt={blok.image.alt || 'Afbeelding Jesus Central'}
          fill
          className="object-cover"
          priority
          fetchPriority="high"
        />
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
