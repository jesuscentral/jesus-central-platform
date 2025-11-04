/**
 * Algolia search result types
 * Based on crawler index structure
 */

export interface AlgoliaSearchResult {
  objectID: string
  title: string
  url: string
  type?: string
  hierarchy?: string[]
  content?: string
  _highlightResult?: {
    title?: {
      value: string
      matchLevel: 'none' | 'partial' | 'full'
    }
    content?: {
      value: string
      matchLevel: 'none' | 'partial' | 'full'
    }
  }
}

export interface SearchResult {
  id: string
  title: string
  url: string
  type?: string
  breadcrumb?: string
  snippet?: string
  highlightedTitle: string
  highlightedSnippet?: string
}
