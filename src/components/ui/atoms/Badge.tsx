import { colors } from '@/lib/colors'
import { cn } from '@/utils/cn'
import Link from 'next/link'

interface BadgeProps {
  link?: string | null
  text: string
  textColor?: string | number
  backgroundColor?: string | number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any // For additional props like storyblokEditable
}

export default function Badge({
  link,
  text,
  textColor = colors.BOLD_DARK,
  backgroundColor = colors.freedom,
  ...additionalProps
}: BadgeProps) {
  const baseClasses = cn(
    'rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase',
  )

  // Use inline styles for dynamic colors to work with Tailwind JIT
  const dynamicStyles = {
    color: `var(--${textColor})`,
    backgroundColor: `var(--${backgroundColor})`,
  }

  if (link) {
    return (
      <Link
        href={link}
        className={baseClasses}
        style={dynamicStyles}
        {...additionalProps}
      >
        {text}
      </Link>
    )
  }
  return (
    <span className={baseClasses} style={dynamicStyles} {...additionalProps}>
      {text}
    </span>
  )
}
