/**
 * Transition Design Tokens
 *
 * Animation and transition timing specifications
 */

export const transitions = {
  duration: {
    fast: 'var(--transition-fast)', // 150ms
    base: 'var(--transition-base)', // 200ms
    slow: 'var(--transition-slow)', // 300ms
  },

  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const

export type TransitionDurationToken = keyof typeof transitions.duration
export type TransitionEasingToken = keyof typeof transitions.easing

/**
 * Common transition presets
 */
export const transitionPresets = {
  fast: `all var(--transition-fast) ${transitions.easing.default}`,
  base: `all var(--transition-base) ${transitions.easing.default}`,
  slow: `all var(--transition-slow) ${transitions.easing.default}`,
} as const
