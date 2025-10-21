/**
 * Color Design Tokens
 *
 * Central color palette for Jesus Central Church
 * All colors should reference CSS variables for theme consistency
 */

export const colors = {
  // Base colors
  background: 'var(--background)',
  foreground: 'var(--foreground)',
  boldness: 'var(--boldness)',
  freedom: 'var(--freedom)',

  // Brand colors (strategy)
  strategyGold: 'var(--strategy-gold)',
  strategyGreen: 'var(--strategy-green)',
  strategyRed: 'var(--strategy-red)',

  // Semantic colors
  primary: {
    DEFAULT: 'var(--primary)',
    hover: 'var(--primary-hover)',
  },
  secondary: {
    DEFAULT: 'var(--secondary)',
    hover: 'var(--secondary-hover)',
  },
  accent: {
    DEFAULT: 'var(--accent)',
    hover: 'var(--accent-hover)',
  },
  muted: {
    DEFAULT: 'var(--muted)',
    foreground: 'var(--muted-foreground)',
  },

  // UI colors
  border: 'var(--border)',
  input: 'var(--input)',
  ring: 'var(--ring)',

  // Status colors
  success: 'var(--success)',
  warning: 'var(--warning)',
  error: 'var(--error)',
  info: 'var(--info)',
} as const

export type ColorToken = keyof typeof colors
