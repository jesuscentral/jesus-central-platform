'use client'

import { SbScrollingText } from '@storyblok/types/287435740670216/storyblok-components'
import { motion } from 'framer-motion'
import { SbBlokData } from '@storyblok/react'
import { storyblokEditable } from '@storyblok/react'
import { cn } from '@/utils/cn'

export default function ScrollingText({ blok }: { blok: SbScrollingText }) {
  return (
    <div
      {...storyblokEditable(blok as SbBlokData)}
      className={cn(
        'relative py-12',
        `bg-${blok.backgroundColor}`,
        `text-${blok.textColor}`,
      )}
    >
      <div className="overflow-hidden">
        <motion.div
          initial={{ x: '0%' }}
          whileInView={{ x: '-50%' }}
          viewport={{ once: true }}
          transition={{ duration: 18, ease: 'linear' }}
          className="font-heading whitespace-nowrap"
        >
          <span className="text-jcc-freedom/80 mx-8 text-xl tracking-wider uppercase md:text-2xl">
            {blok.text}
          </span>
          <span className="text-jcc-freedom/80 mx-8 text-xl tracking-wider uppercase md:text-2xl">
            {blok.text}
          </span>
          <span className="text-jcc-freedom/80 mx-8 text-xl tracking-wider uppercase md:text-2xl">
            {blok.text}
          </span>
          <span className="text-jcc-freedom/80 mx-8 text-xl tracking-wider uppercase md:text-2xl">
            {blok.text}
          </span>
        </motion.div>
      </div>
    </div>
  )
}
