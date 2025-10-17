"use client";

import { useCallback } from "react";
import { useAssets, useAssetSearch, useKeyboardNavigation } from "../../hooks";
import { SearchInput, LoadingSkeleton } from "../ui";
import { AssetGrid } from "./AssetGrid";
import { SelectedAssetPreview } from "./SelectedAssetPreview";

interface AssetSelectorProps {
  selectedAssetId?: number;
  onSelect: (assetId: number) => void;
  label?: string;
  className?: string;
  folderName?: string;
}

/**
 * Optimized asset selector component
 * Refactored with custom hooks and split components
 */
export function AssetSelector({
  selectedAssetId,
  onSelect,
  label = "Select Image",
  className = "",
  folderName = "public_events",
}: AssetSelectorProps) {
  // Load assets
  const { assets, isLoading } = useAssets(folderName);

  // Search functionality
  const { searchQuery, setSearchQuery, clearSearch, filteredAssets } =
    useAssetSearch(assets);

  // Find selected asset
  const selectedAsset = assets.find((a) => a.id === selectedAssetId);

  // Handle asset selection
  const handleAssetClick = useCallback(
    (assetId: number, index: number) => {
      onSelect(assetId);
      setFocusedIndex(index);
    },
    [onSelect]
  );

  // Keyboard navigation
  const { focusedIndex, setFocusedIndex, gridRef, handleKeyDown } =
    useKeyboardNavigation({
      totalItems: filteredAssets.length,
      columns: 4,
      onSelect: (index) => {
        const asset = filteredAssets[index];
        if (asset) {
          handleAssetClick(asset.id, index);
        }
      },
    });

  return (
    <div className={className}>
      {/* Label */}
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {folderName && (
          <span className="ml-2 text-xs text-gray-500 font-normal">
            (from {folderName})
          </span>
        )}
      </label>

      {/* Loading State */}
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <>
          {/* Search Input */}
          <div className="mb-3">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={clearSearch}
              placeholder="Search images..."
            />
          </div>

          {/* Selected Asset Preview */}
          {selectedAsset && <SelectedAssetPreview asset={selectedAsset} />}

          {/* Asset Grid */}
          <AssetGrid
            assets={filteredAssets}
            selectedAssetId={selectedAssetId}
            focusedIndex={focusedIndex}
            gridRef={gridRef}
            onAssetClick={handleAssetClick}
            onKeyDown={handleKeyDown}
            searchQuery={searchQuery}
            folderName={folderName}
          />

          {/* Results Count */}
          <p className="text-xs text-gray-500 mt-2">
            {filteredAssets.length} image{filteredAssets.length !== 1 ? "s" : ""}{" "}
            {searchQuery && `matching "${searchQuery}"`}
          </p>
        </>
      )}
    </div>
  );
}
