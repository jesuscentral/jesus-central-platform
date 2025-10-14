export const storyblokConfig = {
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  isPreview: process.env.NEXT_PUBLIC_STORYBLOK_IS_PREVIEW === "true",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL ?? "",
  spaceId: "287435740670216",
  region: "eu" as const,
} as const;

export const storyblokApiConfig = {
  version: storyblokConfig.isPreview ? "draft" : "published",
  resolve_links: "url",
} as const;
