'use client'

import {
  storyblokEditable,
  StoryblokServerComponent,
} from '@storyblok/react/rsc'
import { SbSection } from '@storyblok/types/287435740670216/storyblok-components'
import { SbBlokData } from '@storyblok/react'
import { cn } from '@/utils/cn'
import { motion } from 'framer-motion'
import { customContainerVariants, fadeInUp } from '@/lib/animations'
import { useMotionPreference } from '@/components/MotionProvider'

export default function Section({ blok }: { blok: SbSection }) {
  const { shouldReduceMotion } = useMotionPreference()

  const sectionMotionProps = shouldReduceMotion
    ? { initial: false }
    : {
        variants: customContainerVariants,
        initial: 'hidden' as const,
        whileInView: 'visible' as const,
        viewport: { once: true, margin: '0px', amount: 0.1 },
      }

  const itemMotionProps = shouldReduceMotion
    ? { initial: false }
    : { variants: fadeInUp }

  return (
    <motion.section
      {...sectionMotionProps}
      className={cn(
        'relative overflow-hidden',
        `bg-${blok.backgroundColor}`,
        `text-${blok.color}`,
        'py-12',
        'space-y-6',
      )}
      {...storyblokEditable(blok as SbBlokData)}
    >
      {blok.block?.map((nestedBlok) => (
        <motion.div
          key={nestedBlok._uid}
          {...itemMotionProps}
          className="container mx-auto h-full px-4"
        >
          <StoryblokServerComponent blok={nestedBlok} />
        </motion.div>
      ))}
    </motion.section>
  )
}
