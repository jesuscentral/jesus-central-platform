interface EmptyStateProps {
  message: string;
  description?: string;
}

/**
 * Empty state component with icon
 */
export function EmptyState({ message, description }: EmptyStateProps) {
  return (
    <div className="col-span-full text-center text-gray-500 py-12">
      <svg
        className="w-12 h-12 mx-auto mb-3 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      <p className="font-medium">{message}</p>
      {description && (
        <p className="text-sm text-gray-400 mt-1">{description}</p>
      )}
    </div>
  );
}
