"use client";

import type { StoryblokAsset } from "../../types";
import { AssetCard } from "./AssetCard";
import { EmptyState } from "../ui/EmptyState";

interface AssetGridProps {
  assets: StoryblokAsset[];
  selectedAssetId?: number;
  focusedIndex: number;
  gridRef: React.RefObject<HTMLDivElement | null>;
  onAssetClick: (assetId: number, index: number) => void;
  onKeyDown: (e: React.KeyboardEvent, index: number, assetId: number) => void;
  searchQuery: string;
  folderName?: string;
}

/**
 * Grid display of assets
 */
export function AssetGrid({
  assets,
  selectedAssetId,
  focusedIndex,
  gridRef,
  onAssetClick,
  onKeyDown,
  searchQuery,
  folderName,
}: AssetGridProps) {
  return (
    <div className="border border-gray-200 rounded-lg max-h-[500px] overflow-y-auto bg-gray-50">
      <div
        ref={gridRef}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 p-4"
        role="listbox"
        aria-label="Available images"
      >
        {assets.length === 0 ? (
          <EmptyState
            message="No images found"
            description={
              searchQuery
                ? "Try a different search term"
                : `No images in ${folderName || "this folder"}`
            }
          />
        ) : (
          assets.map((asset, index) => (
            <AssetCard
              key={asset.id}
              asset={asset}
              isSelected={selectedAssetId === asset.id}
              isFocused={focusedIndex === index}
              onClick={() => onAssetClick(asset.id, index)}
              onKeyDown={(e) => onKeyDown(e, index, asset.id)}
              index={index}
            />
          ))
        )}
      </div>
    </div>
  );
}
