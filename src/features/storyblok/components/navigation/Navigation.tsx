'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
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
import { SearchButton, useSearchShortcuts } from '@/features/search'

// Dynamically import SearchDialog to avoid SSR issues and reduce initial bundle
const SearchDialog = dynamic(() => import('@/features/search/search-dialog'), {
  ssr: false,
})

interface NavigationProps {
  config: SbWebsiteConfig
}

export default function Navigation({ config }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { scrollY } = useScroll()

  // Global keyboard shortcuts for search
  useSearchShortcuts(() => setIsSearchOpen(true), isSearchOpen)

  // Check initial scroll position on mount
  useEffect(() => {
    // Check if already scrolled on initial load
    // Avoid calling setState synchronously in the effect body.
    // Instead, use requestAnimationFrame to defer to the next tick.
    if (window.scrollY > 50) {
      requestAnimationFrame(() => setScrolled(true))
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
        <div className="xs:gap-3 xs:px-4 xs:py-4 relative mx-auto flex w-full max-w-7xl items-center justify-between gap-2 overflow-hidden px-3 py-3 sm:gap-4 sm:px-6 sm:py-6 md:gap-6">
          {/* Logo - allows logo to shrink slightly on very small screens */}
          <div className="flex min-w-0 shrink items-center">
            <Link href={'/'} className="block">
              <Image
                src={logo?.filename ?? ''}
                alt={logo?.alt || ''}
                width={logo?.width ?? 200}
                height={logo?.height ?? 60}
                priority
                className="xs:h-10 xs:max-w-[160px] h-9 w-auto max-w-[140px] transition-all sm:h-14 sm:max-w-[250px] md:h-16 md:max-w-[280px] lg:h-[60px] lg:max-w-[360px]"
                sizes="(max-width: 640px) 140px, (max-width: 768px) 180px, (max-width: 1024px) 200px, 240px"
              />
            </Link>
          </div>

          {/* Right side - CTA Buttons, Search, and Menu */}
          <div className="xs:gap-2 flex flex-shrink-0 items-center gap-1.5 sm:gap-3 md:gap-4">
            {/* Geven button - matches circular button heights */}
            <Button
              href="/geven"
              type="strategy-red"
              variant="primary"
              size="small"
              className="xs:h-10 xs:px-4 xs:text-xs xs:min-w-[140px] relative z-[85] flex h-10 min-w-[90px] items-center justify-center px-3 text-[10px] whitespace-nowrap shadow-md transition-all hover:shadow-lg sm:h-12 sm:px-5 sm:text-sm md:h-14 md:px-6 md:text-sm"
            >
              Geven
            </Button>

            {/* Desktop additional CTA buttons */}
            {header_cta_buttons && header_cta_buttons.length > 0 && (
              <div className="hidden items-center gap-3 md:flex lg:gap-4">
                {header_cta_buttons.map((cta) => (
                  <StoryblokServerComponent key={cta._uid} blok={cta} />
                ))}
              </div>
            )}

            {/* Search Button */}
            <SearchButton onOpen={() => setIsSearchOpen(true)} />

            {/* Menu Button - integrated into flex container */}
            {config.show_menu && (
              <div className="relative z-[110]">
                <CinematicMenu
                  menu_data={config.menu_data}
                  social_links={config.social_links}
                />
              </div>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Search Dialog */}
      <SearchDialog
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  )
}
