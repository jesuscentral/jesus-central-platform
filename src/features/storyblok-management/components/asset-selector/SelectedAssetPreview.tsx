import type { StoryblokAsset } from '../../types'
import Image from '@/components/ui/atoms/Image'

interface SelectedAssetPreviewProps {
  asset: StoryblokAsset
}

/**
 * Preview card for selected asset
 */
export function SelectedAssetPreview({ asset }: SelectedAssetPreviewProps) {
  return (
    <div className="animate-in fade-in slide-in-from-top-2 mb-3 flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-3 duration-200">
      <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-green-300">
        <Image
          src={asset.filename}
          alt={asset.alt || asset.short_filename}
          className="h-full w-full object-cover"
          fill
          loading="lazy"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-green-900">
          {asset.short_filename}
        </p>
        <p className="text-xs text-green-700">Selected</p>
      </div>
      <svg
        className="h-5 w-5 flex-shrink-0 text-green-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    </div>
  )
}
