'use client'

import { useState } from 'react'
import type { StoryblokAsset } from '../../types'
import Image from 'next/image'

interface AssetCardProps {
  asset: StoryblokAsset
  isSelected: boolean
  isFocused: boolean
  onClick: () => void
  onKeyDown: (e: React.KeyboardEvent) => void
  index: number
}

/**
 * Individual asset card with lazy loading and animations
 */
export function AssetCard({
  asset,
  isSelected,
  isFocused,
  onClick,
  onKeyDown,
  index,
}: AssetCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  return (
    <button
      type="button"
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={isFocused ? 0 : -1}
      role="option"
      aria-selected={isSelected}
      className={`group focus:ring-brand-orange relative aspect-square transform overflow-hidden rounded-lg border-2 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:outline-none ${
        isSelected
          ? 'border-brand-orange ring-brand-orange scale-[1.02] ring-2 ring-offset-2'
          : 'hover:border-brand-orange/50 border-gray-200'
      } `}
      style={{
        animationDelay: `${index * 30}ms`,
      }}
    >
      {/* Image Container */}
      <div className="relative h-full w-full bg-gray-100">
        {/* Loading Placeholder */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 animate-pulse bg-gray-200" />
        )}

        {/* Image or Error State */}
        {!imageError ? (
          <Image
            fill
            src={asset.filename}
            alt={asset.alt || asset.short_filename}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`h-full w-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'} `}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <svg
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        )}

        {/* Overlay */}
        <div
          className={`absolute inset-0 transition-all duration-200 ${
            isSelected
              ? 'bg-brand-orange/20'
              : 'bg-black/0 group-hover:bg-black/10'
          } `}
        />

        {/* Filename Label */}
        <div
          className={`absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-2 pt-6 transition-all duration-200 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} `}
        >
          <p className="truncate text-xs font-medium text-white">
            {asset.short_filename}
          </p>
        </div>

        {/* Selected Checkmark */}
        {isSelected && (
          <div className="bg-brand-orange animate-in zoom-in absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full shadow-lg duration-200">
            <svg
              className="h-4 w-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        )}
      </div>
    </button>
  )
}
