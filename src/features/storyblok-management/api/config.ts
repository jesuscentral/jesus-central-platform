/**
 * Configuration for Storyblok Management API
 */

export const STORYBLOK_SPACE_ID = '287435740670216'
export const STORYBLOK_MANAGEMENT_API_URL = 'https://mapi.storyblok.com/v1'

/**
 * Get the Management API token from environment
 * Note: This requires a Management API token, not the public preview token
 */
export function getManagementToken(): string {
  const token = process.env.STORYBLOK_MANAGEMENT_TOKEN
  if (!token) {
    throw new Error(
      'STORYBLOK_MANAGEMENT_TOKEN is not set. Please add it to your .env file.',
    )
  }
  return token
}

/**
 * Get the base path for stories from environment
 */
export function getBasePath(): string {
  return process.env.NEXT_PUBLIC_BASE_PATH || ''
}
