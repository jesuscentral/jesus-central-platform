import { SbBlokData } from '@storyblok/react/rsc'

// Generic prop types
export interface BlokComponentProps<T extends SbBlokData = SbBlokData> {
  blok: T
}

export interface StoryblokConfig {
  accessToken: string | undefined
  isPreview: boolean
  basePath: string
  baseUrl: string
  spaceId: string
  region: 'eu' | 'us'
}
