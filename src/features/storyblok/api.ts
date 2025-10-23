import { apiPlugin } from '@storyblok/react/rsc'
import { storyblokInit } from '@storyblok/react/rsc'
import { componentMap } from '@/features/storyblok/components'
import {
  storyblokConfig,
  storyblokApiConfig,
} from '@/features/storyblok/config'
import { getLanguageConfig } from './utils'
import { unstable_cache } from 'next/cache'

// Cache durations (in seconds)
const STORYBLOK_CACHE = {
  PUBLISHED: 60 * 60, // 1 hour for published content
  DRAFT: 0, // No cache for draft/preview
  STORIES: 60 * 30, // 30 minutes for story lists
}

export const getStoryblokApi = storyblokInit({
  accessToken: storyblokConfig.accessToken,
  use: [apiPlugin],
  bridge: storyblokConfig.isPreview ? false : true,
  apiOptions: {
    region: storyblokConfig.region,
  },
  components: componentMap,
})

export { storyblokApiConfig }

export const getStory = async (slug: string[]) => {
  const storyblok = getStoryblokApi()

  const language = await getLanguageConfig()

  const joinedSlug = slug.join('/')
  const finalSlug =
    joinedSlug === '/' || joinedSlug === '' || joinedSlug === undefined
      ? 'home'
      : joinedSlug

  const revalidate = storyblokConfig.isPreview
    ? STORYBLOK_CACHE.DRAFT
    : STORYBLOK_CACHE.PUBLISHED

  try {
    const { data } = await storyblok.get(
      `cdn/stories/${storyblokConfig.basePath}/${finalSlug}`,
      {
        ...storyblokApiConfig,
        language: language,
      },
      {
        cache: storyblokConfig.isPreview ? 'no-store' : 'force-cache',
        next: {
          revalidate,
          tags: [`story-${finalSlug}`, 'storyblok-stories'],
        },
      },
    )

    if (!data?.story) {
      return null
    }

    return data?.story
  } catch {
    return null
  }
}
export const getStoriesByUuids = async (uuids: string[]) => {
  const language = await getLanguageConfig()
  const storyblok = getStoryblokApi()
  const revalidate = storyblokConfig.isPreview ? 0 : STORYBLOK_CACHE.STORIES
  const { data } = await storyblok.get(
    'cdn/stories/',
    {
      ...storyblokApiConfig,
      per_page: 25,
      by_uuids: uuids.join(','),
      language: language,
    },
    {
      cache: storyblokConfig.isPreview ? 'no-store' : 'force-cache',
      next: {
        revalidate,
        tags: ['storyblok-stories'],
      },
    },
  )

  return data?.stories
}

// Re-export utilities
export { linkResolver } from '@/features/storyblok/utils'
export { getStoryblokSeoParameters } from '@/features/storyblok/utils'
