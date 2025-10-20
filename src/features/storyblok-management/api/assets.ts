'use server'

import {
  STORYBLOK_SPACE_ID,
  STORYBLOK_MANAGEMENT_API_URL,
  getManagementToken,
} from './config'
import type {
  StoryblokAsset,
  FetchAssetsParams,
  FetchAssetsResponse,
  AssetFolder,
  FetchAssetFoldersResponse,
} from '../types'

/**
 * Fetch assets from Storyblok
 */
export async function fetchAssets(
  params?: FetchAssetsParams,
): Promise<FetchAssetsResponse> {
  const token = getManagementToken()

  // Build query parameters
  const queryParams = new URLSearchParams()
  if (params?.in_folder !== undefined) {
    queryParams.append('in_folder', params.in_folder.toString())
  }
  if (params?.sort_by) {
    queryParams.append('sort_by', params.sort_by)
  }
  if (params?.is_private !== undefined) {
    queryParams.append('is_private', params.is_private ? '1' : '0')
  }
  if (params?.search) {
    queryParams.append('search', params.search)
  }
  if (params?.by_alt) {
    queryParams.append('by_alt', params.by_alt)
  }
  if (params?.by_copyright) {
    queryParams.append('by_copyright', params.by_copyright)
  }
  if (params?.by_title) {
    queryParams.append('by_title', params.by_title)
  }
  if (params?.with_tags) {
    queryParams.append('with_tags', params.with_tags)
  }
  if (params?.per_page) {
    queryParams.append('per_page', params.per_page.toString())
  }
  if (params?.page) {
    queryParams.append('page', params.page.toString())
  }

  const queryString = queryParams.toString()
  const url = `${STORYBLOK_MANAGEMENT_API_URL}/spaces/${STORYBLOK_SPACE_ID}/assets/${queryString ? `?${queryString}` : ''}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(
      `Failed to fetch assets: ${response.status} ${response.statusText} - ${errorText}`,
    )
  }

  return response.json()
}

/**
 * Fetch asset folders from Storyblok
 */
export async function fetchAssetFolders(): Promise<FetchAssetFoldersResponse> {
  const token = getManagementToken()

  const response = await fetch(
    `${STORYBLOK_MANAGEMENT_API_URL}/spaces/${STORYBLOK_SPACE_ID}/asset_folders/`,
    {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    },
  )

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(
      `Failed to fetch asset folders: ${response.status} ${response.statusText} - ${errorText}`,
    )
  }

  return response.json()
}

/**
 * Find an asset folder by name
 */
export async function findAssetFolderByName(
  folderName: string,
): Promise<AssetFolder | null> {
  try {
    const { asset_folders } = await fetchAssetFolders()
    const folder = asset_folders.find(
      (f) => f.name.toLowerCase() === folderName.toLowerCase(),
    )
    return folder || null
  } catch (error) {
    console.error('Failed to find asset folder:', error)
    return null
  }
}

/**
 * Fetch only image assets from Storyblok
 */
export async function fetchImageAssets(params?: {
  search?: string
  per_page?: number
  folderName?: string
}): Promise<StoryblokAsset[]> {
  try {
    let folderId: number | undefined

    // If a folder name is specified, find its ID first
    if (params?.folderName) {
      const folder = await findAssetFolderByName(params.folderName)
      if (folder) {
        folderId = folder.id
      } else {
        console.warn(`Folder "${params.folderName}" not found`)
        return []
      }
    }

    const result = await fetchAssets({
      search: params?.search,
      sort_by: 'updated_at:desc',
      per_page: params?.per_page || 100,
      ...(folderId && { in_folder: folderId }),
    })

    // Filter for image assets only
    const imageAssets = result.assets.filter((asset) =>
      asset.content_type.startsWith('image/'),
    )

    return imageAssets
  } catch (error) {
    console.error('Failed to fetch image assets:', error)
    return []
  }
}
