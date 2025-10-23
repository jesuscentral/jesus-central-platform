'use client'

import { motion } from 'framer-motion'

interface EventDescriptionProps {
  description: string
}

export default function EventDescription({
  description,
}: EventDescriptionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="bg-boldness/50 flex-1 overflow-y-auto rounded-xl p-4 shadow-lg backdrop-blur-md"
    >
      <h2 className="font-heading text-strategy-gold mb-2 text-base font-bold tracking-wide uppercase md:text-lg">
        Over dit evenement
      </h2>
      <p className="font-body text-freedom/90 text-xs leading-relaxed md:text-sm">
        {description}
      </p>
    </motion.div>
  )
}
