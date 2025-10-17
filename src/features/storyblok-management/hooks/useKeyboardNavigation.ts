"use client";

import { useState, useCallback, useRef } from "react";

interface UseKeyboardNavigationProps {
  totalItems: number;
  columns: number;
  onSelect: (index: number) => void;
}

/**
 * Hook for grid keyboard navigation
 */
export function useKeyboardNavigation({
  totalItems,
  columns,
  onSelect,
}: UseKeyboardNavigationProps) {
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const gridRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      switch (e.key) {
        case "Enter":
        case " ":
          e.preventDefault();
          onSelect(index);
          setFocusedIndex(index);
          break;

        case "ArrowRight":
          e.preventDefault();
          if (index < totalItems - 1) {
            setFocusedIndex(index + 1);
            const nextButton = gridRef.current?.children[index + 1];
            (nextButton as HTMLButtonElement)?.focus();
          }
          break;

        case "ArrowLeft":
          e.preventDefault();
          if (index > 0) {
            setFocusedIndex(index - 1);
            const prevButton = gridRef.current?.children[index - 1];
            (prevButton as HTMLButtonElement)?.focus();
          }
          break;

        case "ArrowDown":
          e.preventDefault();
          if (index + columns < totalItems) {
            setFocusedIndex(index + columns);
            const belowButton = gridRef.current?.children[index + columns];
            (belowButton as HTMLButtonElement)?.focus();
          }
          break;

        case "ArrowUp":
          e.preventDefault();
          if (index - columns >= 0) {
            setFocusedIndex(index - columns);
            const aboveButton = gridRef.current?.children[index - columns];
            (aboveButton as HTMLButtonElement)?.focus();
          }
          break;
      }
    },
    [totalItems, columns, onSelect]
  );

  return {
    focusedIndex,
    setFocusedIndex,
    gridRef,
    handleKeyDown,
  };
}
