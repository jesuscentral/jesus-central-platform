'use client'

import { Search } from 'lucide-react'
import { colors } from '@/lib/colors'

interface SearchButtonProps {
  onOpen: () => void
}

/**
 * Search button component
 * Matches the CinematicMenu button style for consistency
 */
export default function SearchButton({ onOpen }: SearchButtonProps) {
  const colorScheme = {
    name: colors.STRATEGY_RED,
    accentColor: '#eb3700',
    accentRgba: 'rgba(235, 55, 0, 0.1)',
    hoverShadow: 'rgba(235, 55, 0, 0.5)',
  }

  return (
    <button
      onClick={onOpen}
      aria-label="Open search"
      className="group bg-freedom/10 border-freedom/20 relative z-[85] flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border backdrop-blur-md transition-all duration-500 hover:scale-110 sm:h-12 sm:w-12"
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = colorScheme.accentColor
        e.currentTarget.style.boxShadow = `0 0 30px ${colorScheme.hoverShadow}`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = ''
        e.currentTarget.style.boxShadow = ''
      }}
    >
      <Search
        className="text-freedom h-5 w-5 transition-all duration-300 sm:h-6 sm:w-6"
        aria-hidden="true"
      />
    </button>
  )
}
