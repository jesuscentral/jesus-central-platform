'use server'

import { revalidatePath } from 'next/cache'
import { createStory, fetchAssets } from '../api'
import type {
  CreateEventFormData,
  EventSelectedAssets,
  CreateEventResult,
} from '../types/events'

/**
 * Create an event story in Storyblok
 */
export async function createEvent(
  formData: CreateEventFormData,
  selectedAssets?: EventSelectedAssets,
): Promise<CreateEventResult> {
  try {
    // Upload files if provided, or use selected assets
    let thumbnailAsset
    let preacherPictureAsset

    // Handle thumbnail - prioritize selected asset over file upload
    if (selectedAssets?.thumbnailAssetId) {
      // Fetch the selected asset details
      const assetsResult = await fetchAssets({ per_page: 1 })
      const asset = assetsResult.assets.find(
        (a) => a.id === selectedAssets.thumbnailAssetId,
      )
      if (asset) {
        thumbnailAsset = {
          id: asset.id,
          filename: asset.filename,
          alt: asset.alt || asset.short_filename,
        }
      }
    }

    // Handle preacher picture - prioritize selected asset over file upload
    if (selectedAssets?.preacherPictureAssetId) {
      // Fetch the selected asset details
      const assetsResult = await fetchAssets({ per_page: 1 })
      const asset = assetsResult.assets.find(
        (a) => a.id === selectedAssets.preacherPictureAssetId,
      )
      if (asset) {
        preacherPictureAsset = {
          id: asset.id,
          filename: asset.filename,
          alt: asset.alt || asset.short_filename,
        }
      }
    }

    // Generate slug from title
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

    // Create the event content object
    const eventContent = {
      component: 'event',
      title: formData.title,
      description: formData.description,
      date: formData.date,
      speaker: formData.speaker || '',
      location: formData.location || '',
      type: formData.type || '',
      language: formData.language || '',
      translationAvailable: formData.translationAvailable || false,
      ...(thumbnailAsset && {
        thumbnail: {
          id: thumbnailAsset.id,
          filename: thumbnailAsset.filename,
          alt: thumbnailAsset.alt,
        },
      }),
      ...(preacherPictureAsset && {
        preacherPicture: {
          id: preacherPictureAsset.id,
          filename: preacherPictureAsset.filename,
          alt: preacherPictureAsset.alt,
        },
      }),
      ...(formData.youtubeLink && {
        youtubeLink: {
          linktype: 'url',
          url: formData.youtubeLink,
          cached_url: formData.youtubeLink,
        },
      }),
    }

    // Create the story
    const result = await createStory({
      name: formData.title,
      slug: `jesuscentral/activiteiten/${slug}`,
      parent_id: 96460237931648,
      content: eventContent,
      published: false,
    })

    // Revalidate the agenda page to show the new event
    revalidatePath('/activiteiten')

    return {
      success: true,
      storyId: result.story.id,
      storySlug: result.story.slug,
    }
  } catch (error) {
    console.error('Failed to create event:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}
