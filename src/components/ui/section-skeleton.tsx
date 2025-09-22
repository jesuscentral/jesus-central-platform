export default function SectionSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-96 bg-gray-800/20 rounded-lg"></div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="relative h-[min(100vh,760px)] overflow-hidden bg-bold animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-bold" />
      <div className="relative z-10 flex h-full flex-col">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-6">
          <div className="h-10 w-48 bg-gray-800/30 rounded"></div>
        </div>
        <div className="flex flex-1 items-center">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-6 px-4 pb-16 pt-6">
            <div className="h-16 w-3/4 bg-gray-800/30 rounded"></div>
            <div className="h-24 w-2/3 bg-gray-800/30 rounded"></div>
            <div className="flex gap-4">
              <div className="h-12 w-40 bg-gray-800/30 rounded-full"></div>
              <div className="h-12 w-48 bg-gray-800/30 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
