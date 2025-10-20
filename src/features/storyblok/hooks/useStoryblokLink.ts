import { StoryblokMultilink } from '@storyblok/types/storyblok'
import { linkResolver } from '../utils'

export function useStoryblokLink(link: StoryblokMultilink | undefined): string {
  return linkResolver(link)
}
