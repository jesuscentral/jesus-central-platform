'use client'

import React from 'react'
import { cn } from '@/utils/cn'
import type { ElementType, JSX, Ref } from 'react'

const VARIANT_TO_COMPONENT: {
  readonly [key in
    | 'display'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5']: keyof JSX.IntrinsicElements
} = {
  display: 'div',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
} as const

const getHeadingVariants = (
  variant: 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5',
  weight?: 'regular' | 'medium' | 'bold',
): string => {
  return cn(
    'text-5xl font-semibold tracking-tight sm:text-7xl mt-4',
    weight === 'regular' && 'font-regular',
    weight === 'medium' && 'font-medium',
    weight === 'bold' && 'font-bold',
    variant === 'display' &&
      'text-5xl font-extrabold tracking-tight sm:text-7xl',
    variant === 'h1' && 'text-4xl font-extrabold tracking-tight sm:text-5xl',
    variant === 'h2' && 'text-3xl font-extrabold tracking-tight sm:text-4xl',
    variant === 'h3' && 'text-2xl font-extrabold tracking-tight sm:text-3xl',
    variant === 'h4' && 'text-xl font-extrabold tracking-tight sm:text-2xl',
    variant === 'h5' && 'text-lg font-extrabold tracking-tight sm:text-xl',
  )
}

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  variant: 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
  as?: ElementType
  ref?: Ref<HTMLHeadingElement>
  weight?: 'regular' | 'medium' | 'bold'
  children?: React.ReactNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any // For additional props like storyblokEditable
}

const Heading = ({
  as,
  variant,
  className,
  weight,
  children,
  ...additionalProps
}: HeadingProps) => {
  // Determine component type outside of JSX to avoid creating during render
  const componentType: ElementType =
    as || (VARIANT_TO_COMPONENT[variant] as ElementType)

  const props = {
    'data-variant': variant,
    className: cn(getHeadingVariants(variant, weight), className),
    ...additionalProps,
    children,
  }

  // Use createElement to avoid ESLint "Cannot create components during render" error
  // This is the recommended pattern for polymorphic components in React
  return React.createElement(componentType, props)
}

export { Heading }
