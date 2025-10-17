"use client";

import { useState, useEffect } from "react";
import { fetchImageAssets } from "../api/assets";
import type { StoryblokAsset } from "../types";

/**
 * Hook for fetching and managing assets
 */
export function useAssets(folderName?: string) {
  const [assets, setAssets] = useState<StoryblokAsset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadAssets = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedAssets = await fetchImageAssets({
          per_page: 200,
          folderName,
        });

        if (isMounted) {
          setAssets(fetchedAssets);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error("Failed to load assets"));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadAssets();

    return () => {
      isMounted = false;
    };
  }, [folderName]);

  return { assets, isLoading, error };
}
