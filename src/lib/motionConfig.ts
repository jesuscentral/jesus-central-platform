import type { FeatureBundle } from 'framer-motion'

export const EASING = {
  standard: [0.25, 0.1, 0.25, 1] as const,
  decelerate: [0.2, 0, 0, 1] as const,
  accelerate: [0.4, 0, 1, 1] as const,
  emphasize: [0.17, 0.67, 0.3, 1.33] as const,
  linear: [0, 0, 1, 1] as const,
}

export const DURATIONS = {
  instant: 0.001,
  xs: 0.16,
  sm: 0.24,
  md: 0.4,
  lg: 0.6,
  xl: 0.8,
} as const

export const STAGGERS = {
  container: 0.12,
  containerDelay: 0.08,
  item: 0.06,
} as const

export const SPRING_PRESETS = {
  gentle: {
    type: 'spring',
    stiffness: 140,
    damping: 22,
    mass: 1,
  },
  relaxed: {
    type: 'spring',
    stiffness: 120,
    damping: 26,
    mass: 1.1,
  },
  snappy: {
    type: 'spring',
    stiffness: 220,
    damping: 20,
    mass: 0.85,
  },
} as const

export const DEFAULT_TRANSITION = {
  duration: DURATIONS.md,
  ease: EASING.standard,
} as const

export const loadMotionFeatures = async (): Promise<FeatureBundle> => {
  const motion = await import('framer-motion')
  return motion.domAnimation
}
