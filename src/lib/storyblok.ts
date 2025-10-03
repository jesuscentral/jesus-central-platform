import { apiPlugin } from "@storyblok/react/rsc";
import { storyblokInit } from "@storyblok/react/rsc";
import { componentMap } from "@/features/storyblok/components";
import {
  storyblokConfig,
  storyblokApiConfig,
  resolveRelations,
} from "@/features/storyblok/config";
import { updateStory } from "@/features/storyblok/utils";

export const getStoryblokApi = storyblokInit({
  accessToken: storyblokConfig.accessToken,
  use: [apiPlugin],
  bridge: storyblokConfig.isPreview ? false : true,
  apiOptions: {
    region: storyblokConfig.region,
  },
  components: componentMap,
});

export { storyblokApiConfig };

export const getStory = async (slug: string) => {
  const storyblok = getStoryblokApi();

  const finalSlug =
    slug === "/" || slug === "" || slug === undefined ? "home" : slug;

  try {
    const { data } = await storyblok.get(
      `cdn/stories/${storyblokConfig.basePath}/${finalSlug}`,
      {
        ...storyblokApiConfig,
        resolve_relations: [...resolveRelations],
      }
    );

    if (!data?.story) {
      return null;
    }

    const resolvedRelations = data?.rels;
    const updatedStory = updateStory(data?.story, resolvedRelations);

    return updatedStory;
  } catch {
    return null;
  }
};

// Re-export utilities
export { linkResolver } from "@/features/storyblok/utils";
export { getStoryblokSeoParameters } from "@/features/storyblok/utils";
