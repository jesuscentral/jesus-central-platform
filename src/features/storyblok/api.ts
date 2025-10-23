import { apiPlugin } from '@storyblok/react/rsc'
import { storyblokInit } from '@storyblok/react/rsc'
import { componentMap } from '@/features/storyblok/components'
import {
  storyblokConfig,
  storyblokApiConfig,
} from '@/features/storyblok/config'
import { getLanguageConfig } from './utils'

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

  try {
    const { data } = await storyblok.get(
      `cdn/stories/${storyblokConfig.basePath}/${finalSlug}`,
      {
        ...storyblokApiConfig,
        language: language,
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
  const { data } = await storyblok.get('cdn/stories/', {
    ...storyblokApiConfig,
    per_page: 25,
    by_uuids: uuids.join(','),
    language: language,
  })

  return data?.stories
}

// Re-export utilities
export { linkResolver } from '@/features/storyblok/utils'
export { getStoryblokSeoParameters } from '@/features/storyblok/utils'
