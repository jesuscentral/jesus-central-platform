import React from 'react'
import Link from 'next/link'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'
import { colors } from '@/lib/colors'

export type ButtonType = (typeof colors)[keyof typeof colors]
export type ButtonVariant = 'primary' | 'outline'
export type ButtonSize = 'small' | 'medium' | 'large'

/**
 * Button component variants using CVA
 * Provides consistent styling with type-safe variant props
 */
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold uppercase tracking-wide transition-all duration-base cursor-pointer',
  {
    variants: {
      // Color variants based on brand strategy colors
      colorScheme: {
        boldness: '',
        freedom: '',
        'strategy-red': '',
        'strategy-gold': '',
        'strategy-green': '',
      },
      // Visual style variants
      variant: {
        primary: 'shadow-lg',
        outline: 'bg-transparent border-2',
      },
      // Size variants using design tokens
      size: {
        small: 'text-xs px-4 py-2',
        medium: 'text-sm px-8 py-3',
        large: 'text-base px-12 py-4',
      },
    },
    // Compound variants for color + variant combinations
    compoundVariants: [
      // Boldness primary
      {
        colorScheme: 'boldness',
        variant: 'primary',
        class: 'bg-boldness text-freedom shadow-black/30 hover:brightness-125',
      },
      // Boldness outline
      {
        colorScheme: 'boldness',
        variant: 'outline',
        class:
          'border-boldness text-boldness hover:bg-boldness hover:text-freedom',
      },
      // Freedom primary
      {
        colorScheme: 'freedom',
        variant: 'primary',
        class: 'bg-freedom text-boldness shadow-black/10 hover:brightness-95',
      },
      // Freedom outline
      {
        colorScheme: 'freedom',
        variant: 'outline',
        class:
          'border-freedom text-freedom hover:bg-freedom hover:text-boldness',
      },
      // Strategy Red primary
      {
        colorScheme: 'strategy-red',
        variant: 'primary',
        class:
          'bg-strategy-red text-boldness shadow-black/20 hover:brightness-110',
      },
      // Strategy Red outline
      {
        colorScheme: 'strategy-red',
        variant: 'outline',
        class:
          'border-strategy-red text-strategy-red hover:bg-strategy-red hover:text-boldness',
      },
      // Strategy Gold primary
      {
        colorScheme: 'strategy-gold',
        variant: 'primary',
        class:
          'bg-strategy-gold text-boldness shadow-black/20 hover:brightness-110',
      },
      // Strategy Gold outline
      {
        colorScheme: 'strategy-gold',
        variant: 'outline',
        class:
          'border-strategy-gold text-strategy-gold hover:bg-strategy-gold hover:text-boldness',
      },
      // Strategy Green primary
      {
        colorScheme: 'strategy-green',
        variant: 'primary',
        class:
          'bg-strategy-green text-freedom shadow-black/20 hover:brightness-110',
      },
      // Strategy Green outline
      {
        colorScheme: 'strategy-green',
        variant: 'outline',
        class:
          'border-strategy-green text-strategy-green hover:bg-strategy-green hover:text-freedom',
      },
    ],
    defaultVariants: {
      colorScheme: 'strategy-red',
      variant: 'primary',
      size: 'medium',
    },
  },
)

export interface ButtonProps extends VariantProps<typeof buttonVariants> {
  href?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (e: any) => void
  type?: ButtonType
  children: React.ReactNode
  showArrowIcon?: boolean
  className?: string
  disabled?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any // For additional props like storyblokEditable
}

const ArrowIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

export default function Button({
  href,
  onClick,
  type = colors.STRATEGY_RED,
  colorScheme,
  variant = 'primary',
  size = 'medium',
  children,
  showArrowIcon = false,
  className,
  disabled = false,
  ...additionalProps
}: ButtonProps) {
  // Map legacy 'type' prop to 'colorScheme' for backwards compatibility
  const finalColorScheme = (colorScheme || type) as
    | 'boldness'
    | 'freedom'
    | 'strategy-red'
    | 'strategy-gold'
    | 'strategy-green'

  const buttonClasses = cn(
    buttonVariants({
      colorScheme: finalColorScheme,
      variant,
      size,
    }),
    disabled && 'opacity-50 cursor-not-allowed',
    className,
  )

  const content = (
    <>
      {children}
      {showArrowIcon && <ArrowIcon />}
    </>
  )

  if (href && !disabled) {
    return (
      <Link href={href} className={buttonClasses} {...additionalProps}>
        {content}
      </Link>
    )
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      {...additionalProps}
    >
      {content}
    </button>
  )
}
