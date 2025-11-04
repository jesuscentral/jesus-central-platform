'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { X, Search, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, usePathname } from 'next/navigation'
import { performSearch } from './algolia'
import type { SearchResult } from './types'
import SearchResultItem from './search-result-item'

interface SearchDialogProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * Search dialog component
 * Full-screen animated search interface with Algolia integration
 */
export default function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [hasSearched, setHasSearched] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Debounced search
  const handleSearch = useCallback(async (searchQuery: string) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    debounceTimerRef.current = setTimeout(async () => {
      if (!searchQuery.trim()) {
        setResults([])
        setHasSearched(false)
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setHasSearched(true)

      try {
        const searchResults = await performSearch(searchQuery)
        setResults(searchResults)
        setSelectedIndex(-1)
      } catch (error) {
        console.error('Search error:', error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }, 250)
  }, [])

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    setIsLoading(true)
    handleSearch(value)
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault()
      const selectedResult = results[selectedIndex]
      if (selectedResult) {
        router.push(selectedResult.url)
        onClose()
      }
    }
  }

  // Handle result click
  const handleResultClick = () => {
    onClose()
    setQuery('')
    setResults([])
    setHasSearched(false)
  }

  // Focus input when dialog opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Reset state when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setQuery('')
      setResults([])
      setSelectedIndex(-1)
      setHasSearched(false)
    }
  }, [isOpen])

  // Handle route changes (close dialog on navigation)
  useEffect(() => {
    if (isOpen) {
      onClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Scroll selected result into view
  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current) {
      const selectedElement = resultsRef.current.children[selectedIndex] as
        | HTMLElement
        | undefined
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        })
      }
    }
  }, [selectedIndex])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-boldness/90 fixed inset-0 z-[120] backdrop-blur-md"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto px-4 pt-20 pb-20 sm:pt-32"
            onClick={(e) => {
              // Close when clicking the dialog container (not content)
              if (e.target === e.currentTarget) {
                onClose()
              }
            }}
          >
            <div className="w-full max-w-2xl">
              {/* Search Input */}
              <div className="relative mb-8">
                <Search className="text-freedom/40 absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Zoek pagina's en evenementen..."
                  className="text-freedom placeholder:text-freedom/40 border-freedom/20 bg-freedom/5 focus:border-strategy-red/50 focus:bg-freedom/10 focus:ring-strategy-red/20 w-full rounded-2xl border-2 px-12 py-4 text-lg backdrop-blur-md transition-all duration-300 focus:ring-2 focus:outline-none"
                />
                <div className="absolute top-1/2 right-4 flex -translate-y-1/2 items-center gap-2">
                  {isLoading && (
                    <Loader2 className="text-freedom/40 h-5 w-5 animate-spin" />
                  )}
                  <button
                    onClick={onClose}
                    aria-label="Sluit zoeken"
                    className="text-freedom hover:text-strategy-red hover:bg-freedom/10 focus:ring-strategy-red/50 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 focus:ring-2 focus:outline-none"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Results */}
              <div
                ref={resultsRef}
                className="space-y-3"
                role="listbox"
                aria-label="Zoekresultaten"
              >
                {hasSearched && !isLoading && results.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-freedom/60 border-freedom/10 bg-freedom/5 rounded-lg border p-8 text-center"
                  >
                    <p className="text-lg">Geen resultaten gevonden</p>
                    <p className="mt-2 text-sm">Probeer een andere zoekterm</p>
                  </motion.div>
                )}

                {!hasSearched && !isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-freedom/60 border-freedom/10 bg-freedom/5 rounded-lg border p-8 text-center"
                  >
                    <p className="text-lg">Begin met typen om te zoeken</p>
                    <p className="mt-2 text-sm">
                      Zoek door pagina&apos;s en evenementen
                    </p>
                  </motion.div>
                )}

                {results.map((result, index) => (
                  <SearchResultItem
                    key={result.id}
                    result={result}
                    isSelected={index === selectedIndex}
                    index={index}
                    onClick={handleResultClick}
                  />
                ))}
              </div>

              {/* Keyboard shortcut hint */}
              <div className="text-freedom/40 mt-8 text-center text-xs">
                <kbd className="border-freedom/20 bg-freedom/5 rounded border px-2 py-1">
                  Esc
                </kbd>{' '}
                om te sluiten
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
