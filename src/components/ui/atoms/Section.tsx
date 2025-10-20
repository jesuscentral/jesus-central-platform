'use client'

import { cn } from '@/utils/cn'

export default function Section({
  backgroundColor,
  color,
  children,
  ...additionalProps
}: {
  backgroundColor: string
  color: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
  children: React.ReactNode
}) {
  return (
    <section
      className={cn(
        'relative overflow-hidden',
        `bg-${backgroundColor}`,
        `text-${color}`,
        'py-12',
      )}
      {...additionalProps}
    >
      <div className="container mx-auto space-y-24 px-4">{children}</div>
    </section>
  )
}
