'use client'

import { algoliasearch } from 'algoliasearch'
import type { SearchResponse } from 'algoliasearch'
import type { AlgoliaSearchResult, SearchResult } from './types'

/**
 * Algolia search client and helper functions
 * Uses the lite build for minimal bundle size
 */

let searchClient: ReturnType<typeof algoliasearch> | null = null

/**
 * Initialize Algolia search client
 * Only creates client if env vars are available
 */
function getSearchClient() {
  if (searchClient) {
    return searchClient
  }

  const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID
  const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY

  if (!appId || !apiKey) {
    throw new Error(
      'Algolia credentials not configured. Please set NEXT_PUBLIC_ALGOLIA_APP_ID and NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY',
    )
  }

  searchClient = algoliasearch(appId, apiKey)
  return searchClient
}

/**
 * Transform Algolia result to SearchResult format
 */
function transformResult(hit: AlgoliaSearchResult): SearchResult {
  const highlightedTitle =
    hit._highlightResult?.title?.value || hit.title || 'Untitled'
  const highlightedSnippet = hit._highlightResult?.content?.value
  const content = hit.content || ''
  const snippet = highlightedSnippet || content.slice(0, 200)

  // Build breadcrumb from hierarchy if available
  const breadcrumb = hit.hierarchy
    ? hit.hierarchy.filter(Boolean).join(' › ')
    : undefined

  return {
    id: hit.objectID,
    title: hit.title || 'Untitled',
    url: hit.url || '#',
    type: hit.type,
    breadcrumb,
    snippet: content.slice(0, 200),
    highlightedTitle,
    highlightedSnippet: highlightedSnippet || undefined,
  }
}

/**
 * Perform search query against Algolia index
 * @param query - Search query string
 * @returns Promise with array of search results
 */
export async function performSearch(query: string): Promise<SearchResult[]> {
  if (!query.trim()) {
    return []
  }

  try {
    const client = getSearchClient()
    const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME

    if (!indexName) {
      throw new Error(
        'Algolia index name not configured. Please set NEXT_PUBLIC_ALGOLIA_INDEX_NAME',
      )
    }

    const response: SearchResponse<AlgoliaSearchResult> =
      await client.searchSingleIndex({
        indexName,
        searchParams: {
          query,
          hitsPerPage: 8,
          attributesToRetrieve: [
            'title',
            'url',
            'type',
            'content',
            'hierarchy',
          ],
          attributesToHighlight: ['title', 'content'],
        },
      })

    return response.hits.map(transformResult)
  } catch (error) {
    console.error('Algolia search error:', error)
    return []
  }
}

/**
 * Check if Algolia is configured
 */
export function isAlgoliaConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID &&
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY &&
    process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME
  )
}
