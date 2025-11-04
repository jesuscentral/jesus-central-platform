'use client'

import { useEffect } from 'react'

/**
 * Global keyboard shortcuts hook for search
 * Handles Cmd/Ctrl+K and / to open search
 */
export function useSearchShortcuts(onOpen: () => void, isOpen: boolean): void {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input/textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement)?.isContentEditable
      ) {
        return
      }

      // Cmd/Ctrl+K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (!isOpen) {
          onOpen()
        }
        return
      }

      // / to open search (only if not already open)
      if (e.key === '/' && !isOpen) {
        e.preventDefault()
        onOpen()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onOpen, isOpen])
}
