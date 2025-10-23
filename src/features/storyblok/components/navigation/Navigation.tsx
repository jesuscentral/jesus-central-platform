'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import CinematicMenu from '@/components/ui/organisms/CinematicMenu'
import {
  SbBlokData,
  storyblokEditable,
  StoryblokServerComponent,
} from '@storyblok/react/rsc'
import { SbWebsiteConfig } from '@storyblok/types/287435740670216/storyblok-components'
import { cn } from '@/utils/cn'
import Button from '@/components/ui/atoms/Button'

interface NavigationProps {
  config: SbWebsiteConfig
}

export default function Navigation({ config }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  // Check initial scroll position on mount
  useEffect(() => {
    // Check if already scrolled on initial load
    const initialScrollY = window.scrollY
    if (initialScrollY > 50) {
      setScrolled(true)
    }

    const unsubscribe = scrollY.on('change', (latest) => {
      setScrolled(latest > 50)
    })

    return () => unsubscribe()
  }, [scrollY])

  const navOpacity = useTransform(scrollY, [0, 50], [0, 1])
  const navScale = useTransform(scrollY, [0, 50], [0.98, 1])

  if (!config) {
    return null
  }

  const { logo, header_cta_buttons } = config

  return (
    <>
      <motion.nav
        {...storyblokEditable(config as SbBlokData)}
        className={cn(
          'fixed inset-x-0 top-0 z-[80] transition-shadow duration-300',
        )}
      >
        {/* Animated background that slides down */}
        <motion.div
          className="absolute inset-0 overflow-hidden"
          initial={false}
          animate={{
            y: scrolled ? 0 : -100,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
        >
          {/* Main background with gradient */}
          <motion.div
            className="bg-boldness absolute inset-0 rounded-b-3xl"
            style={{
              opacity: navOpacity,
              scale: navScale,
              backdropFilter: scrolled ? `blur(12px)` : 'blur(0px)',
            }}
          />

          {/* Animated accent bar at bottom */}
          <motion.div
            className="via-strategy-red absolute right-0 bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: scrolled ? 1 : 0,
              opacity: scrolled ? 1 : 0,
            }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.1,
            }}
          />
        </motion.div>

        {/* Content layer (above background) */}
        <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:py-6">
          <div className="flex items-center">
            <Link href={'/'} className="block">
              <Image
                src={logo?.filename ?? ''}
                alt={logo?.alt || ''}
                width={logo?.width ?? 200}
                height={logo?.height ?? 60}
                priority
                className="xs:h-12 xs:max-w-[200px] h-10 w-auto max-w-[160px] transition-all sm:h-14 sm:max-w-[250px] md:h-16 md:max-w-[280px] lg:h-[60px] lg:max-w-[360px]"
                sizes="(max-width: 640px) 160px, (max-width: 768px) 180px, (max-width: 1024px) 200px, 240px"
              />
            </Link>
          </div>

          {/* CTA Buttons - visible on all screens */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            {/* Geven button - responsive sizing */}
            <Button
              href="/geven"
              type="strategy-red"
              variant="primary"
              size="small"
              className="xs:text-xs xs:px-5 xs:py-2.5 relative z-[85] px-4 py-2 text-[10px] whitespace-nowrap shadow-md hover:shadow-lg sm:px-6 sm:py-3 sm:text-sm md:px-8 md:py-3 md:text-sm"
            >
              Geven
            </Button>

            {/* Desktop additional CTA buttons */}
            <div className="hidden items-center gap-4 md:flex">
              {header_cta_buttons &&
                header_cta_buttons.map((cta) => (
                  <StoryblokServerComponent key={cta._uid} blok={cta} />
                ))}
            </div>

            {/* Spacer for hamburger menu on mobile/tablet - increased width to prevent overlap */}
            <div className="w-14 sm:w-16 md:w-0 lg:w-20" />
          </div>
        </div>
      </motion.nav>

      {/* Menu rendered outside nav to avoid z-index stacking context issues */}
      {config.show_menu && (
        <div className="fixed top-4 right-4 z-[110] sm:top-6 sm:right-6 md:top-6 md:right-6">
          <CinematicMenu
            menu_data={config.menu_data}
            social_links={config.social_links}
          />
        </div>
      )}
    </>
  )
}
