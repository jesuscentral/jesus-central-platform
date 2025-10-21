/**
 * Typography Design Tokens
 *
 * Font families, sizes, weights, and related properties
 */

export const typography = {
  fontFamily: {
    heading: 'var(--font-heading)',
    body: 'var(--font-body)',
  },

  fontSize: {
    xs: 'var(--font-size-xs)', // 12px / 0.75rem
    sm: 'var(--font-size-sm)', // 14px / 0.875rem
    base: 'var(--font-size-base)', // 16px / 1rem
    lg: 'var(--font-size-lg)', // 18px / 1.125rem
    xl: 'var(--font-size-xl)', // 20px / 1.25rem
    '2xl': 'var(--font-size-2xl)', // 24px / 1.5rem
    '3xl': 'var(--font-size-3xl)', // 30px / 1.875rem
    '4xl': 'var(--font-size-4xl)', // 36px / 2.25rem
    '5xl': 'var(--font-size-5xl)', // 48px / 3rem
    '6xl': 'var(--font-size-6xl)', // 60px / 3.75rem
  },

  fontWeight: {
    normal: 'var(--font-weight-normal)', // 400
    medium: 'var(--font-weight-medium)', // 500
    semibold: 'var(--font-weight-semibold)', // 600
    bold: 'var(--font-weight-bold)', // 700
    extrabold: 'var(--font-weight-extrabold)', // 800
  },

  lineHeight: {
    tight: 'var(--line-height-tight)', // 1.25
    snug: 'var(--line-height-snug)', // 1.375
    normal: 'var(--line-height-normal)', // 1.5
    relaxed: 'var(--line-height-relaxed)', // 1.625
    loose: 'var(--line-height-loose)', // 2
  },

  letterSpacing: {
    tight: 'var(--letter-spacing-tight)', // -0.025em
    normal: 'var(--letter-spacing-normal)', // 0
    wide: 'var(--letter-spacing-wide)', // 0.025em
  },
} as const

export type TypographyToken = keyof typeof typography
export type FontSizeToken = keyof typeof typography.fontSize
export type FontWeightToken = keyof typeof typography.fontWeight
export type LineHeightToken = keyof typeof typography.lineHeight
export type LetterSpacingToken = keyof typeof typography.letterSpacing
