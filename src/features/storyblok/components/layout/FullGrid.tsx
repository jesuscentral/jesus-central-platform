'use client'

import { cn } from '@/utils/cn'
import {
  SbBlokData,
  storyblokEditable,
  StoryblokServerComponent,
} from '@storyblok/react/rsc'
import { SbFullGrid } from '@storyblok/types/287435740670216/storyblok-components'
import { Variants, motion } from 'framer-motion'
import { DURATIONS, EASING } from '@/lib/motionConfig'
import { useMotionPreference } from '@/components/MotionProvider'

export default function FullGrid({ blok }: { blok: SbFullGrid }) {
  const { shouldReduceMotion } = useMotionPreference()

  const fadeInVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: DURATIONS.lg,
        ease: EASING.standard,
      },
    },
  }

  const columnMotionProps = shouldReduceMotion
    ? { initial: false }
    : {
        variants: fadeInVariants,
        initial: 'hidden' as const,
        whileInView: 'show' as const,
        viewport: { once: true },
      }
  // Background color handling - for Tailwind classes to work, they need to be complete strings
  const getBackgroundClass = () => {
    if (!blok.backgroundColor) return ''
    // Map common color values to Tailwind classes
    return `bg-${blok.backgroundColor}`
  }

  // Maximum 3 columns, items will wrap to next row if more than 3
  const colCount = Math.min(blok.columns?.length ?? 2, 3)
  const colCountClass =
    colCount === 1
      ? 'md:grid-cols-1'
      : colCount === 2
        ? 'md:grid-cols-2'
        : 'md:grid-cols-3'

  // Check if all columns contain Card components
  const hasOnlyCards = blok.columns?.every(
    (nestedBlok) => nestedBlok.component === 'card',
  )

  // Check if any column contains an Image component with fullHeight
  const hasFullHeightImage = blok.columns?.some(
    (nestedBlok) => nestedBlok.component === 'image' && nestedBlok.fullHeight,
  )

  return (
    <section
      className={cn('relative overflow-hidden', getBackgroundClass())}
      {...storyblokEditable(blok as SbBlokData)}
    >
      <div className="pointer-events-none absolute inset-0 opacity-25" />
      <div className="relative">
        <div
          className={cn(
            'grid grid-cols-1',
            colCountClass,
            // If all items are cards or has full height images, use stretch alignment
            hasOnlyCards || hasFullHeightImage
              ? 'items-stretch'
              : 'items-start',
          )}
        >
          {blok.columns?.map((nestedBlok) => {
            const isCard = nestedBlok.component === 'card'
            const isFullHeightImage =
              nestedBlok.component === 'image' && nestedBlok.fullHeight

            return (
              <motion.div
                {...columnMotionProps}
                key={nestedBlok._uid}
                className={cn(
                  'min-h-[200px]',
                  // If it's a card and all items are cards, make it fill the grid cell
                  isCard && hasOnlyCards ? 'flex h-full' : '',
                  // If it's a full height image, make it fill the grid cell
                  isFullHeightImage ? 'h-full' : '',
                )}
              >
                <div
                  className={cn(
                    isCard && hasOnlyCards ? 'flex-1' : '',
                    isFullHeightImage ? 'h-full' : '',
                  )}
                >
                  <StoryblokServerComponent blok={nestedBlok} />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
