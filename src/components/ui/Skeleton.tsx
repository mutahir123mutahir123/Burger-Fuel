export function ProductCardSkeleton() {
  return (
    <div
      className="animate-pulse overflow-hidden rounded-md border border-surface-high bg-surface"
      aria-hidden="true"
    >
      <div className="aspect-[4/3] bg-surface-3" />
      <div className="space-y-4 p-5">
        <div className="h-4 w-3/4 rounded-sm bg-surface-3" />
        <div className="h-3 w-full rounded-sm bg-surface-2" />
        <div className="h-3 w-2/3 rounded-sm bg-surface-2" />
        <div className="flex items-center justify-between pt-2">
          <div className="h-5 w-16 rounded-sm bg-surface-3" />
          <div className="h-10 w-24 rounded-sm bg-surface-3" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      role="status"
      aria-label="Loading menu"
    >
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2" aria-hidden="true">
      <div className="animate-pulse aspect-square rounded-md bg-surface-3" />
      <div className="animate-pulse space-y-5">
        <div className="h-10 w-2/3 rounded-sm bg-surface-3" />
        <div className="h-4 w-full rounded-sm bg-surface-2" />
        <div className="h-4 w-5/6 rounded-sm bg-surface-2" />
        <div className="h-4 w-4/6 rounded-sm bg-surface-2" />
        <div className="h-12 w-40 rounded-sm bg-surface-3" />
        <div className="h-14 w-full max-w-sm rounded-sm bg-surface-2" />
      </div>
    </div>
  );
}

export function TickerSkeleton() {
  return (
    <div className="h-12 animate-pulse rounded-md bg-surface-3" aria-hidden="true" />
  );
}

export function CategoryChipSkeleton() {
  return (
    <div className="flex flex-wrap gap-3" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-10 w-24 animate-pulse rounded-full bg-surface-3" />
      ))}
    </div>
  );
}