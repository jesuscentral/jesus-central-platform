/**
 * Z-Index Design Tokens
 *
 * Layering system for stacking context management
 */

export const zIndex = {
  dropdown: 'var(--z-index-dropdown)', // 1000
  sticky: 'var(--z-index-sticky)', // 1020
  fixed: 'var(--z-index-fixed)', // 1030
  modalBackdrop: 'var(--z-index-modal-backdrop)', // 1040
  modal: 'var(--z-index-modal)', // 1050
  popover: 'var(--z-index-popover)', // 1060
  tooltip: 'var(--z-index-tooltip)', // 1070
} as const

export type ZIndexToken = keyof typeof zIndex

/**
 * Numeric values for reference
 */
export const zIndexValues = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const
