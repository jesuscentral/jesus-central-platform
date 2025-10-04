"use server";

import { getStoryblokApi, storyblokApiConfig } from "@/features/storyblok/api";
import { getLanguageConfig } from "./language";

/**
 * Get website config based on the current slug path
 * Determines which website (jesuscentral or jesuscentralworship) based on the slug
 * Automatically uses language from cookie for translations
 */
export async function getWebsiteConfig() {
  const storyblok = getStoryblokApi();
  const language = await getLanguageConfig();

  const websiteFolder = process.env.NEXT_PUBLIC_BASE_PATH;

  try {
    const { data } = await storyblok.get(
      `cdn/stories/${websiteFolder}/website-config`,
      {
        ...storyblokApiConfig,
        language: language,
      }
    );

    return data?.story || null;
  } catch (error) {
    console.error(
      `Failed to fetch website config for ${websiteFolder}:`,
      error
    );
    return null;
  }
}
