/**
 * Border Design Tokens
 *
 * Border radius and width specifications
 */

export const borders = {
  radius: {
    xs: 'var(--radius-xs)', // 2px / 0.125rem
    sm: 'var(--radius-sm)', // 4px / 0.25rem
    md: 'var(--radius-md)', // 8px / 0.5rem
    lg: 'var(--radius-lg)', // 12px / 0.75rem
    xl: 'var(--radius-xl)', // 16px / 1rem
    '2xl': 'var(--radius-2xl)', // 24px / 1.5rem
    full: 'var(--radius-full)', // 9999px
  },

  width: {
    thin: 'var(--border-width-thin)', // 1px
    DEFAULT: 'var(--border-width)', // 2px
    thick: 'var(--border-width-thick)', // 3px
  },

  color: 'var(--border)',
} as const

export type BorderRadiusToken = keyof typeof borders.radius
export type BorderWidthToken = keyof typeof borders.width
