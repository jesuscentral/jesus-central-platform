"use client";

import { useState, useMemo } from "react";
import type { StoryblokAsset } from "../types";

/**
 * Hook for searching and filtering assets
 */
export function useAssetSearch(assets: StoryblokAsset[]) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAssets = useMemo(
    () =>
      assets.filter(
        (asset) =>
          asset.short_filename
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          asset.alt?.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [assets, searchQuery]
  );

  const clearSearch = () => setSearchQuery("");

  return {
    searchQuery,
    setSearchQuery,
    clearSearch,
    filteredAssets,
  };
}
