/**
 * Loading skeleton for asset grid
 */
export function LoadingSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="h-10 bg-gray-200 rounded-lg" />
      <div className="border border-gray-200 rounded-lg p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {Array.from({ length: count }).map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-gray-200 rounded-md"
              style={{
                animationDelay: `${i * 50}ms`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
