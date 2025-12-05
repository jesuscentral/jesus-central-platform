'use client'

import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

import { AnimatePresence, motion } from 'framer-motion'
import { BookOpenText, Info, X } from 'lucide-react'
import { SbStatementScripture } from '@storyblok/types/287435740670216/storyblok-components'
import { SbBlokData, storyblokEditable } from '@storyblok/react/rsc'
import { DURATIONS, EASING } from '@/lib/motionConfig'

export default function StatementScripture({
  blok,
}: {
  blok: SbStatementScripture
}) {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    requestAnimationFrame(() => {
      setMounted(true)
    })
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (open && triggerRef.current) {
      const updatePosition = () => {
        if (!triggerRef.current) return

        const rect = triggerRef.current.getBoundingClientRect()
        const tooltipWidth = isMobile
          ? Math.min(360, window.innerWidth - 32)
          : 360
        const tooltipHeight = tooltipRef.current?.offsetHeight || 150
        const gap = 12
        const padding = 16

        let left = rect.left + rect.width / 2 - tooltipWidth / 2
        let top = rect.bottom + gap

        // Mobile: center horizontally, ensure padding from edges
        if (isMobile) {
          left = Math.max(
            padding,
            Math.min(left, window.innerWidth - tooltipWidth - padding),
          )
        } else {
          // Desktop: check if tooltip would go off the right edge
          if (left + tooltipWidth > window.innerWidth - padding) {
            left = window.innerWidth - tooltipWidth - padding
          }
          // Check if tooltip would go off the left edge
          if (left < padding) {
            left = padding
          }
        }

        // Check if tooltip would go off the bottom edge
        if (top + tooltipHeight > window.innerHeight - padding) {
          top = rect.top - tooltipHeight - gap
          // If still off screen at top, position at bottom with scroll
          if (top < padding) {
            top = window.innerHeight - tooltipHeight - padding
          }
        }

        setPosition({ top, left })
      }

      updatePosition()

      // Update position on scroll or resize
      window.addEventListener('scroll', updatePosition, true)
      window.addEventListener('resize', updatePosition)

      return () => {
        window.removeEventListener('scroll', updatePosition, true)
        window.removeEventListener('resize', updatePosition)
      }
    }
  }, [open, isMobile])

  const handleOpen = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setOpen(true)
  }

  const handleClose = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150)
  }

  const handleToggle = () => {
    if (isMobile) {
      setOpen((prev) => !prev)
    }
  }

  const tooltipContent = open && blok.content && mounted && (
    <AnimatePresence>
      <motion.div
        ref={tooltipRef}
        initial={{ opacity: 0, y: 8, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.96 }}
        transition={{ duration: DURATIONS.sm, ease: EASING.standard }}
        style={{
          position: 'fixed',
          top: position.top,
          left: position.left,
          width: isMobile ? 'calc(100vw - 32px)' : '360px',
          maxWidth: '360px',
          zIndex: 1070, // z-tooltip
        }}
        className="bg-foreground text-background border-background/20 relative overflow-hidden rounded-2xl border p-6 text-sm shadow-2xl backdrop-blur-sm sm:p-6"
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative gradient background */}
        <div className="from-strategy-gold/10 to-strategy-green/10 pointer-events-none absolute inset-0 bg-gradient-to-br via-transparent" />

        {/* Close button for mobile */}
        {isMobile && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              setOpen(false)
            }}
            className="text-background/60 hover:text-background absolute top-4 right-4 z-20 transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        <div className="relative z-10">
          <div className="text-background/80 mb-3 flex items-center gap-2 text-xs font-semibold tracking-wider uppercase">
            <div className="bg-strategy-gold/20 flex h-6 w-6 items-center justify-center rounded-full">
              <Info className="text-strategy-gold h-3.5 w-3.5" />
            </div>
            <span>{blok.ref}</span>
          </div>
          <p className="text-background/90 leading-relaxed">{blok.content}</p>
        </div>

        {/* Decorative corner accent */}
        <div className="bg-strategy-gold/10 pointer-events-none absolute -top-6 -right-6 h-20 w-20 rounded-full blur-xl" />
      </motion.div>
    </AnimatePresence>
  )

  return (
    <>
      <motion.div
        ref={triggerRef}
        {...storyblokEditable(blok as SbBlokData)}
        className="group inline-flex items-center"
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        onClick={handleToggle}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: DURATIONS.xs, ease: EASING.standard }}
      >
        <motion.span className="text-foreground border-border/40 bg-boldness duration-base hover:border-strategy-gold/40 hover:bg-boldness/90 inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium shadow-sm backdrop-blur-sm transition-all hover:shadow-md active:scale-95 sm:cursor-default">
          <BookOpenText className="text-strategy-gold duration-base h-4 w-4 transition-transform group-hover:rotate-12" />
          <span>{blok.ref}</span>
        </motion.span>
      </motion.div>
      {mounted && createPortal(tooltipContent, document.body)}
    </>
  )
}
