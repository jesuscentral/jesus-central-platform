/**
 * Loading skeleton for asset grid
 */
export function LoadingSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="animate-pulse space-y-3">
      <div className="h-10 rounded-lg bg-gray-200" />
      <div className="rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {Array.from({ length: count }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-md bg-gray-200"
              style={{
                animationDelay: `${i * 50}ms`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
