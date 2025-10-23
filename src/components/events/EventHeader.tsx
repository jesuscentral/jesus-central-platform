'use client'

import { motion } from 'framer-motion'

interface EventHeaderProps {
  type?: string
  title: string
}

export default function EventHeader({ type, title }: EventHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mb-4"
    >
      {type && (
        <div className="bg-strategy-gold text-boldness mb-3 inline-flex rounded-full px-4 py-1.5 text-[10px] font-bold tracking-wider uppercase shadow-lg">
          {type}
        </div>
      )}
      <h1 className="font-heading text-freedom text-2xl leading-tight font-bold tracking-wide uppercase drop-shadow-2xl md:text-3xl lg:text-4xl">
        {title}
      </h1>
    </motion.div>
  )
}
