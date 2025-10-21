/**
 * Design Tokens
 *
 * Central export for all design tokens used in Jesus Central Church
 * Import tokens from here for type-safe design system values
 *
 * @example
 * import { colors, spacing, typography } from '@/design/tokens'
 *
 * const myStyles = {
 *   color: colors.primary.DEFAULT,
 *   padding: spacing.md,
 *   fontSize: typography.fontSize.lg,
 * }
 */

export * from './colors'
export * from './spacing'
export * from './typography'
export * from './borders'
export * from './shadows'
export * from './transitions'
export * from './zIndex'
export * from './breakpoints'

import { colors } from './colors'
import { spacing, spacingPx, semanticSpacing } from './spacing'
import { typography } from './typography'
import { borders } from './borders'
import { shadows } from './shadows'
import { transitions, transitionPresets } from './transitions'
import { zIndex, zIndexValues } from './zIndex'
import { breakpoints, mediaQueries } from './breakpoints'

/**
 * Complete design token object
 */
export const tokens = {
  colors,
  spacing,
  spacingPx,
  semanticSpacing,
  typography,
  borders,
  shadows,
  transitions,
  transitionPresets,
  zIndex,
  zIndexValues,
  breakpoints,
  mediaQueries,
} as const

export default tokens
