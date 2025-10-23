'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { ReactNode } from 'react'

interface EventInfoCardProps {
  icon: LucideIcon
  label: string
  value: string
  delay: number
  action?: ReactNode
  className?: string
}

export default function EventInfoCard({
  icon: Icon,
  label,
  value,
  delay,
  action,
  className = '',
}: EventInfoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`group bg-boldness/50 hover:bg-boldness/60 relative flex items-center justify-between gap-3 rounded-xl p-3 shadow-lg backdrop-blur-md transition-all ${className}`}
    >
      <div className="flex items-center gap-3">
        <Icon className="text-strategy-gold h-4 w-4 flex-shrink-0" />
        <div>
          <p className="font-body text-freedom/60 text-[9px] tracking-wider uppercase">
            {label}
          </p>
          <p className="font-heading text-freedom text-sm font-bold">{value}</p>
        </div>
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </motion.div>
  )
}
