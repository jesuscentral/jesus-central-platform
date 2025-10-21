/**
 * Shadow Design Tokens
 *
 * Box shadow specifications for elevation and depth
 */

export const shadows = {
  xs: 'var(--shadow-xs)',
  sm: 'var(--shadow-sm)',
  md: 'var(--shadow-md)',
  lg: 'var(--shadow-lg)',
  xl: 'var(--shadow-xl)',
  '2xl': 'var(--shadow-2xl)',
  none: 'none',
} as const

export type ShadowToken = keyof typeof shadows
