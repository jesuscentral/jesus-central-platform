namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_STORYBLOK_TOKEN: string
    NEXT_PUBLIC_STORYBLOK_IS_PREVIEW: string
    NEXT_PUBLIC_STORYBLOK_PREFIX: string
    NEXT_PUBLIC_BASE_PATH: string
    NEXT_PUBLIC_BASE_URL: string
    MOLLIE_API_KEY: string
    NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN: string
    EDGE_CONFIG: string
    VERCEL_URL: string | undefined
  }
}
