/**
 * Type definitions for event management
 */

/**
 * Form data structure for creating an event
 */
export interface CreateEventFormData {
  title: string;
  description: string;
  date: string;
  speaker?: string;
  location?: string;
  type?: "service" | "event" | "";
  language: "Nederlands" | "Engels" | "";
  translationAvailable?: boolean;
  youtubeLink?: string;
}

/**
 * Selected assets for event creation
 */
export interface EventSelectedAssets {
  thumbnailAssetId?: number;
  preacherPictureAssetId?: number;
}

/**
 * Result type for event creation
 */
export interface CreateEventResult {
  success: boolean;
  error?: string;
  storyId?: number;
  storySlug?: string;
}
