export default function EventCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg shadow-lg bg-white border border-gray-200 animate-pulse">

      <div className="h-48 bg-gray-300"></div>

      <div className="p-6">

        <div className="h-6 bg-gray-300 rounded mb-2"></div>

        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-4/5"></div>
          <div className="h-4 bg-gray-200 rounded w-3/5"></div>
        </div>

        <div className="flex items-center mb-3">
          <div className="w-4 h-4 bg-gray-200 rounded mr-2"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>

        <div className="h-10 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}

export function EventsGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <EventCardSkeleton key={index} />
      ))}
    </div>
  );
}
