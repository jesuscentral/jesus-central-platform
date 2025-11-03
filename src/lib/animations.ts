import { Variants } from 'framer-motion'
import { DEFAULT_TRANSITION, DURATIONS, EASING, STAGGERS } from './motionConfig'

// Safe container variant - keeps container visible while children animate
export const customContainerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      ...DEFAULT_TRANSITION,
      staggerChildren: STAGGERS.container,
      delayChildren: STAGGERS.containerDelay,
    },
  },
}

// Safe fade-up animation - works reliably on mobile
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.lg,
      ease: EASING.standard,
    },
  },
}
