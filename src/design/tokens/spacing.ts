/**
 * Spacing Design Tokens
 *
 * Consistent spacing scale for margins, padding, and gaps
 * Based on 4px/0.25rem base unit
 *
 * IMPORTANT: For Tailwind classes, use semantic names to avoid conflicts:
 * - p-content, m-content, gap-content (16px) - for text content
 * - p-card, m-card, gap-card (24px) - for card internals
 * - p-section, m-section, gap-section (48px) - for major sections
 *
 * For max-width, width, height, use Tailwind defaults:
 * - max-w-2xl (42rem, not our 3rem!)
 * - w-96, h-64, etc.
 */

export const spacing = {
  xs: 'var(--spacing-xs)', // 4px / 0.25rem
  sm: 'var(--spacing-sm)', // 8px / 0.5rem
  md: 'var(--spacing-md)', // 16px / 1rem - content spacing
  lg: 'var(--spacing-lg)', // 24px / 1.5rem - card spacing
  xl: 'var(--spacing-xl)', // 32px / 2rem
  '2xl': 'var(--spacing-2xl)', // 48px / 3rem - section spacing
  '3xl': 'var(--spacing-3xl)', // 64px / 4rem
} as const

export type SpacingToken = keyof typeof spacing

/**
 * Semantic spacing tokens for Tailwind
 * Use these in your components for clearer intent
 */
export const semanticSpacing = {
  content: 'var(--spacing-md)', // 16px - text content padding
  card: 'var(--spacing-lg)', // 24px - card internal spacing
  section: 'var(--spacing-2xl)', // 48px - major section spacing
} as const

/**
 * Pixel values for reference (computed from rem values)
 */
export const spacingPx = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
} as const
