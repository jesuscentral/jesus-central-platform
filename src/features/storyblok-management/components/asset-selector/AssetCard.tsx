"use client";

import { useState } from "react";
import type { StoryblokAsset } from "../../types";

interface AssetCardProps {
  asset: StoryblokAsset;
  isSelected: boolean;
  isFocused: boolean;
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  index: number;
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
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={isFocused ? 0 : -1}
      role="option"
      aria-selected={isSelected}
      className={`
        group relative aspect-square border-2 rounded-lg overflow-hidden
        transition-all duration-200 transform
        hover:scale-[1.02] hover:shadow-lg
        focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2
        ${
          isSelected
            ? "border-brand-orange ring-2 ring-brand-orange ring-offset-2 scale-[1.02]"
            : "border-gray-200 hover:border-brand-orange/50"
        }
      `}
      style={{
        animationDelay: `${index * 30}ms`,
      }}
    >
      {/* Image Container */}
      <div className="relative w-full h-full bg-gray-100">
        {/* Loading Placeholder */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}

        {/* Image or Error State */}
        {!imageError ? (
          <img
            src={asset.filename}
            alt={asset.alt || asset.short_filename}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`
              w-full h-full object-cover transition-opacity duration-300
              ${imageLoaded ? "opacity-100" : "opacity-0"}
            `}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <svg
              className="w-8 h-8"
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
          className={`
            absolute inset-0 transition-all duration-200
            ${
              isSelected
                ? "bg-brand-orange/20"
                : "bg-black/0 group-hover:bg-black/10"
            }
          `}
        />

        {/* Filename Label */}
        <div
          className={`
            absolute bottom-0 left-0 right-0
            bg-gradient-to-t from-black/80 via-black/60 to-transparent
            p-2 pt-6
            transition-all duration-200
            ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
          `}
        >
          <p className="text-white text-xs font-medium truncate">
            {asset.short_filename}
          </p>
        </div>

        {/* Selected Checkmark */}
        {isSelected && (
          <div className="absolute top-2 right-2 w-6 h-6 bg-brand-orange rounded-full flex items-center justify-center shadow-lg animate-in zoom-in duration-200">
            <svg
              className="w-4 h-4 text-white"
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
  );
}
