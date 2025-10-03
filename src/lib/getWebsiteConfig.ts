import { getStoryblokApi } from "./storyblok";
import { storyblokApiConfig } from "./storyblok";

/**
 * Get website config based on the current slug path
 * Determines which website (jesuscentral or jesuscentralworship) based on the slug
 */
export async function getWebsiteConfig() {
  const storyblok = getStoryblokApi();

  const websiteFolder = process.env.NEXT_PUBLIC_BASE_PATH;

  try {
    const { data } = await storyblok.get(
      `cdn/stories/${websiteFolder}/website-config`,
      {
        ...storyblokApiConfig,
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
