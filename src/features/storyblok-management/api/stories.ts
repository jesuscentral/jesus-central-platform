'use server'

import {
  STORYBLOK_SPACE_ID,
  STORYBLOK_MANAGEMENT_API_URL,
  getManagementToken,
  getBasePath,
} from './config'
import type {
  CreateStoryParams,
  UpdateStoryParams,
  StoryResponse,
} from '../types'

/**
 * Create a story in Storyblok
 */
export async function createStory(
  params: CreateStoryParams,
): Promise<StoryResponse> {
  const token = getManagementToken()
  const basePath = getBasePath()

  // Prepend base path to slug if it exists
  const fullSlug = basePath ? `${basePath}/${params.slug}` : params.slug

  const response = await fetch(
    `${STORYBLOK_MANAGEMENT_API_URL}/spaces/${STORYBLOK_SPACE_ID}/stories`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        story: {
          name: params.name,
          slug: fullSlug,
          content: params.content,
          parent_id: params.parent_id,
          is_folder: params.is_folder || false,
        },
        publish: params.published ? 1 : 0,
      }),
    },
  )

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(
      `Failed to create story: ${response.status} ${response.statusText} - ${errorText}`,
    )
  }

  return response.json()
}

/**
 * Update an existing story in Storyblok
 */
export async function updateStory(
  storyId: number,
  params: UpdateStoryParams,
): Promise<StoryResponse> {
  const token = getManagementToken()

  const response = await fetch(
    `${STORYBLOK_MANAGEMENT_API_URL}/spaces/${STORYBLOK_SPACE_ID}/stories/${storyId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        story: {
          name: params.name,
          slug: params.slug,
          content: params.content,
        },
        publish: params.published ? 1 : 0,
      }),
    },
  )

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(
      `Failed to update story: ${response.status} ${response.statusText} - ${errorText}`,
    )
  }

  return response.json()
}

/**
 * Delete a story from Storyblok
 */
export async function deleteStory(storyId: number): Promise<void> {
  const token = getManagementToken()

  const response = await fetch(
    `${STORYBLOK_MANAGEMENT_API_URL}/spaces/${STORYBLOK_SPACE_ID}/stories/${storyId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: token,
      },
    },
  )

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(
      `Failed to delete story: ${response.status} ${response.statusText} - ${errorText}`,
    )
  }
}
