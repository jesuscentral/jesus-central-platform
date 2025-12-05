'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Quote } from 'lucide-react'
import { SbStatement } from '@storyblok/types/287435740670216/storyblok-components'
import {
  SbBlokData,
  storyblokEditable,
  StoryblokServerComponent,
} from '@storyblok/react/rsc'
import { fadeInUp, customContainerVariants } from '@/lib/animations'
import { DURATIONS, EASING, STAGGERS } from '@/lib/motionConfig'

export type ScriptureRef = {
  ref: string
  content?: string
}

export type JccBeliefProps = {
  stelling: string
  uitleg: string
  scriptures?: ScriptureRef[]
  className?: string
}

export default function Statement({ blok }: { blok: SbStatement }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-10%' })

  return (
    <div
      ref={containerRef}
      {...storyblokEditable(blok as SbBlokData)}
      className="py-section relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isInView ? { opacity: 0.03, scale: 1 } : { opacity: 0, scale: 0.8 }
          }
          transition={{ duration: DURATIONS.xl, ease: EASING.standard }}
          className="bg-strategy-gold absolute top-1/2 -right-20 h-96 w-96 -translate-y-1/2 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isInView ? { opacity: 0.03, scale: 1 } : { opacity: 0, scale: 0.8 }
          }
          transition={{
            duration: DURATIONS.xl,
            delay: 0.2,
            ease: EASING.standard,
          }}
          className="bg-strategy-green absolute top-1/4 -left-20 h-80 w-80 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={customContainerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-12"
        >
          {/* Main Statement Section */}
          <motion.div variants={fadeInUp} className="lg:col-span-6">
            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              className="mb-6 inline-flex items-center gap-2"
            >
              <div className="relative">
                <div className="bg-foreground text-background duration-base inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-wider uppercase shadow-md transition-all hover:shadow-lg">
                  <span>Wat wij geloven</span>
                </div>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={
                    isInView
                      ? { scale: 1, opacity: 1 }
                      : { scale: 0.8, opacity: 0 }
                  }
                  transition={{
                    delay: 0.3,
                    duration: DURATIONS.lg,
                    ease: EASING.emphasize,
                  }}
                  className="bg-strategy-gold/20 absolute -inset-1 rounded-full blur-sm"
                />
              </div>
            </motion.div>

            {/* Statement Heading */}
            <motion.h2
              variants={fadeInUp}
              className="font-heading text-boldness mb-8 text-3xl leading-tight tracking-tight uppercase sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
            >
              <span className="relative inline-block">
                {blok.statement}
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{
                    delay: 0.6,
                    duration: DURATIONS.lg,
                    ease: EASING.standard,
                  }}
                  className="bg-strategy-gold absolute -bottom-2 left-0 h-1 w-full origin-left"
                />
              </span>
            </motion.h2>

            {/* Explanation Card */}
            <motion.div
              variants={fadeInUp}
              className="group border-border/40 bg-boldness duration-base hover:border-border/60 relative overflow-hidden rounded-3xl border p-6 backdrop-blur-sm transition-all hover:shadow-xl sm:p-8 md:p-10"
            >
              {/* Gradient overlay on hover */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="from-strategy-gold/5 to-strategy-green/5 absolute inset-0 bg-gradient-to-br via-transparent"
              />

              {/* Content */}
              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                  }
                  transition={{ delay: 0.4, duration: DURATIONS.md }}
                  className="text-muted-foreground mb-4 inline-flex items-center gap-2"
                >
                  <Quote className="text-strategy-gold h-4 w-4" />
                  <span className="text-xs font-semibold tracking-wider uppercase">
                    Waarom we dit geloven
                  </span>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                  }
                  transition={{ delay: 0.5, duration: DURATIONS.md }}
                  className="text-foreground/90 text-base leading-relaxed sm:text-lg"
                >
                  {blok.explanation}
                </motion.p>
              </div>

              {/* Decorative corner accent */}
              <div className="bg-strategy-gold/10 pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full blur-2xl" />
            </motion.div>
          </motion.div>

          {/* Scriptures Section */}
          <motion.div
            variants={customContainerVariants}
            className="mt-12 lg:col-span-6 lg:mt-0"
          >
            {blok.scriptures && blok.scriptures.length > 0 && (
              <motion.div variants={fadeInUp} className="mb-6">
                <h3 className="text-boldness font-heading text-sm font-semibold tracking-wider uppercase">
                  Schriftverwijzingen
                </h3>
              </motion.div>
            )}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {blok.scriptures?.map((scriptureBlok, index) => (
                <motion.div
                  key={scriptureBlok._uid}
                  variants={fadeInUp}
                  custom={index}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  transition={{
                    delay: 0.6 + index * STAGGERS.item,
                    duration: DURATIONS.md,
                    ease: EASING.standard,
                  }}
                >
                  <StoryblokServerComponent blok={scriptureBlok} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
