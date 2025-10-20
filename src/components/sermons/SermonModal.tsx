'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

export default function SermonModal({
  videoId,
  onClose,
}: {
  videoId: string | null
  onClose: () => void
}) {
  return (
    <AnimatePresence>
      {videoId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="bg-boldness w-full max-w-5xl overflow-hidden rounded-2xl shadow-2xl"
          >
            <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
              <iframe
                title={`YouTube Embed for ${videoId}`}
                src={`https://www.youtube.com/embed/${videoId}`}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
              <button
                onClick={onClose}
                className="absolute top-2 right-2 inline-flex items-center justify-center rounded-full bg-black/60 p-2 text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
