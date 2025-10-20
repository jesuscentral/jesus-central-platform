import { cn } from '@/utils/cn'
import type { ElementType, JSX, Ref } from 'react'

const getDefaultComponent = (
  variant: 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5',
) => {
  const variantToComponent: {
    [key in
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
  }
  return variantToComponent[variant]
}

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  variant: 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
  as?: ElementType
  ref?: Ref<HTMLHeadingElement>
  weight?: 'regular' | 'medium' | 'bold'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any // For additional props like storyblokEditable
}

const Heading = ({
  as,
  variant,
  className,
  weight,
  ...additionalProps
}: HeadingProps) => {
  const headingVariants = ({
    variant,
    weight,
  }: {
    variant: 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
    weight: 'regular' | 'medium' | 'bold' | undefined
  }) => {
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

  const Component = as || getDefaultComponent(variant)
  return (
    <Component
      data-variant={variant}
      className={cn(headingVariants({ variant, weight }), className)}
      {...additionalProps}
    />
  )
}

export { Heading }
