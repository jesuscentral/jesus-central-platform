'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { SearchResult } from './types'
import { cn } from '@/utils/cn'

interface SearchResultItemProps {
  result: SearchResult
  isSelected: boolean
  index: number
  onClick: () => void
}

/**
 * Individual search result item
 * Displays title, breadcrumb, snippet with highlighting
 */
export default function SearchResultItem({
  result,
  isSelected,
  index,
  onClick,
}: SearchResultItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        href={result.url}
        onClick={onClick}
        className={cn(
          'group border-freedom/10 bg-freedom/5 hover:border-strategy-red/30 hover:bg-freedom/10 block rounded-lg border p-4 transition-all duration-300',
          isSelected && 'border-strategy-red/50 bg-freedom/15',
        )}
      >
        <div className="space-y-1.5">
          {/* Title with highlighting */}
          <h3
            className="text-freedom font-heading text-base leading-tight font-bold"
            dangerouslySetInnerHTML={{ __html: result.highlightedTitle }}
          />

          {/* Single line description with highlighting */}
          {result.highlightedSnippet && (
            <p
              className="text-freedom/60 line-clamp-1 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: result.highlightedSnippet }}
            />
          )}
        </div>
      </Link>
    </motion.div>
  )
}
