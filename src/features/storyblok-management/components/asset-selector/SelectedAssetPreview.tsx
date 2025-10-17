import type { StoryblokAsset } from "../../types";

interface SelectedAssetPreviewProps {
  asset: StoryblokAsset;
}

/**
 * Preview card for selected asset
 */
export function SelectedAssetPreview({ asset }: SelectedAssetPreviewProps) {
  return (
    <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0 border border-green-300">
        <img
          src={asset.filename}
          alt={asset.alt || asset.short_filename}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-green-900 truncate">
          {asset.short_filename}
        </p>
        <p className="text-xs text-green-700">Selected</p>
      </div>
      <svg
        className="w-5 h-5 text-green-600 flex-shrink-0"
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
  );
}
