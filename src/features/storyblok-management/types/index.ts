/**
 * Type definitions for Storyblok Management API
 */

/**
 * Asset object structure from Storyblok Management API
 */
export interface StoryblokAsset {
  id: number
  filename: string
  space_id: number
  created_at: string
  updated_at: string
  file: object | null
  asset_folder_id: number | null
  deleted_at: string | null
  short_filename: string
  content_type: string
  content_length: number
  alt: string
  copyright: string
  title: string
  source: string
  expire_at: string | null
  focus: string | null
  internal_tag_ids: string[]
  internal_tags_list: Array<{ id: string; name: string }>
  locked: boolean
  publish_at: string | null
  is_private: boolean
  meta_data: Record<string, unknown>
}

/**
 * Parameters for fetching assets
 */
export interface FetchAssetsParams {
  in_folder?: number
  sort_by?:
    | 'created_at:asc'
    | 'created_at:desc'
    | 'updated_at:asc'
    | 'updated_at:desc'
    | 'short_filename:asc'
    | 'short_filename:desc'
  is_private?: boolean
  search?: string
  by_alt?: string
  by_copyright?: string
  by_title?: string
  with_tags?: string
  per_page?: number
  page?: number
}

/**
 * Response from fetching assets
 */
export interface FetchAssetsResponse {
  assets: StoryblokAsset[]
}

/**
 * Parameters for creating a story
 */
export interface CreateStoryParams {
  name: string
  slug: string
  content: Record<string, unknown>
  parent_id?: number
  is_folder?: boolean
  published?: boolean
}

/**
 * Response from story operations
 */
export interface StoryResponse {
  story: {
    id: number
    uuid: string
    slug: string
  }
}

/**
 * Parameters for updating a story
 */
export interface UpdateStoryParams {
  name?: string
  slug?: string
  content?: Record<string, unknown>
  published?: boolean
}

/**
 * Asset folder object from Storyblok
 */
export interface AssetFolder {
  id: number
  name: string
  parent_id: number | null
}

/**
 * Response from fetching asset folders
 */
export interface FetchAssetFoldersResponse {
  asset_folders: AssetFolder[]
}
