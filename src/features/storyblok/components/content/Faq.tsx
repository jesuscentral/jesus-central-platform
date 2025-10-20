'use client'

import { SbFaq } from '@storyblok/types/287435740670216/storyblok-components'
import { SbBlokData, storyblokEditable } from '@storyblok/react/rsc'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import FaqItem from './FaqItem'
import Link from 'next/link'

interface FaqProps {
  blok: SbFaq
}

export default function Faq({ blok }: FaqProps) {
  // Map background colors to proper brand colors
  const getBackgroundColorClass = (color?: string | number) => {
    const colorMap: Record<string, string> = {
      boldness: 'bg-boldness',
      freedom: 'bg-freedom',
      'strategy-red': 'bg-strategy-red',
      'strategy-gold': 'bg-strategy-gold',
      'strategy-green': 'bg-strategy-green',
    }
    const colorStr = String(color || 'freedom')
    return colorMap[colorStr] || 'bg-freedom'
  }

  // Determine text color based on background
  const getTextColorClass = (bgColor?: string | number) => {
    const colorStr = String(bgColor || 'freedom')
    // Dark backgrounds need light text
    if (colorStr === 'boldness' || colorStr === 'strategy-green') {
      return 'text-freedom'
    }
    // Light backgrounds need dark text
    return 'text-boldness'
  }

  const bgColorClass = getBackgroundColorClass(blok.backgroundColor)
  const textColorClass = getTextColorClass(blok.backgroundColor)

  return (
    <section
      {...storyblokEditable(blok as SbBlokData)}
      className={cn('relative overflow-hidden py-16 md:py-24', bgColorClass)}
    >
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="bg-strategy-red/5 absolute -top-40 -right-40 h-80 w-80 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="bg-strategy-gold/5 absolute -bottom-40 -left-40 h-80 w-80 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 md:px-6">
        {/* Header Section */}
        {(blok.title || blok.subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="mb-12 text-center md:mb-16"
          >
            {blok.title && (
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.1,
                  ease: [0.25, 0.1, 0.25, 1.0],
                }}
                className={cn(
                  'font-heading text-4xl tracking-wide uppercase md:text-5xl lg:text-6xl',
                  textColorClass,
                )}
              >
                {blok.title}
              </motion.h2>
            )}

            {blok.subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                  ease: [0.25, 0.1, 0.25, 1.0],
                }}
                className={cn(
                  'font-body mx-auto mt-4 max-w-2xl text-lg leading-relaxed md:mt-6 md:text-xl',
                  textColorClass.replace('text-', 'text-') + '/80',
                )}
              >
                {blok.subtitle}
              </motion.p>
            )}

            {/* Decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              className="bg-strategy-red mx-auto mt-8 h-1 w-20 rounded-full"
            />
          </motion.div>
        )}

        {/* FAQ Items */}
        <div className="space-y-4 md:space-y-6">
          {blok.items?.map((item, index) => (
            <FaqItem key={item._uid} blok={item} index={index} />
          ))}
        </div>

        {/* Bottom decoration */}
        <Link href="/contact">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 flex justify-center md:mt-16"
          >
            <div
              className={cn(
                'inline-flex items-center gap-2 rounded-full border px-6 py-3 backdrop-blur-sm',
                textColorClass === 'text-boldness'
                  ? 'border-boldness/10 bg-white/50'
                  : 'border-freedom/20 bg-white/10',
              )}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={cn('opacity-60', textColorClass)}
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <span
                className={cn(
                  'font-body text-sm tracking-wider uppercase',
                  textColorClass.replace('text-', 'text-') + '/70',
                )}
              >
                Nog vragen? Neem contact op
              </span>
            </div>
          </motion.div>
        </Link>
      </div>
    </section>
  )
}
