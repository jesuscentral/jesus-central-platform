'use client'

import { LazyMotion, MotionConfig, useReducedMotion } from 'framer-motion'
import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { DEFAULT_TRANSITION, loadMotionFeatures } from '@/lib/motionConfig'

interface MotionPreferenceContextValue {
  shouldReduceMotion: boolean
}

const MotionPreferenceContext = createContext<MotionPreferenceContextValue>({
  shouldReduceMotion: false,
})

export function MotionProvider({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion()
  const shouldReduceMotion = Boolean(prefersReducedMotion)

  const contextValue = useMemo(
    () => ({ shouldReduceMotion }),
    [shouldReduceMotion],
  )

  return (
    <MotionPreferenceContext.Provider value={contextValue}>
      <MotionConfig
        reducedMotion={shouldReduceMotion ? 'always' : 'user'}
        transition={DEFAULT_TRANSITION}
      >
        <LazyMotion features={loadMotionFeatures}>{children}</LazyMotion>
      </MotionConfig>
    </MotionPreferenceContext.Provider>
  )
}

export function useMotionPreference() {
  return useContext(MotionPreferenceContext)
}
