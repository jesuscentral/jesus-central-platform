'use client'

import { useState } from 'react'
import { Share2, Facebook, Twitter, Mail, Link2, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ShareDropdownProps {
  title: string
  text: string
  url: string
}

export default function ShareDropdown({
  title,
  text,
  url,
}: ShareDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url })
        setIsOpen(false)
      } catch (err) {
        console.error('Share failed:', err)
      }
    } else {
      setIsOpen(!isOpen)
    }
  }

  const shareLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: 'hover:bg-blue-500/20 hover:text-blue-400',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      color: 'hover:bg-sky-500/20 hover:text-sky-400',
    },
    {
      name: 'Email',
      icon: Mail,
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + ' ' + url)}`,
      color: 'hover:bg-red-500/20 hover:text-red-400',
    },
  ]

  return (
    <div className="relative">
      <button
        onClick={handleNativeShare}
        className="bg-strategy-red text-freedom hover:bg-strategy-red/90 flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg transition-all hover:scale-105"
        aria-label="Delen"
      >
        <Share2 className="h-4 w-4" />
      </button>

      <AnimatePresence>
        {isOpen && !navigator.share && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
              className="bg-boldness/95 absolute right-0 bottom-full z-50 mb-2 w-48 overflow-hidden rounded-xl shadow-2xl backdrop-blur-xl"
            >
              <div className="p-2">
                {shareLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-freedom flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${link.color}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <link.icon className="h-4 w-4" />
                    <span>{link.name}</span>
                  </a>
                ))}

                <button
                  onClick={handleCopyLink}
                  className="text-freedom hover:bg-strategy-gold/20 hover:text-strategy-gold flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Gekopieerd!</span>
                    </>
                  ) : (
                    <>
                      <Link2 className="h-4 w-4" />
                      <span>Kopieer link</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
