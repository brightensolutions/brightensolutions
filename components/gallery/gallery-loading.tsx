import { Skeleton } from "@/components/ui/skeleton"

export default function GalleryLoading() {
  return (
    <div>
      <div className="mb-8 flex justify-center">
        <Skeleton className="h-10 w-[300px] rounded-lg" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="overflow-hidden rounded-lg">
            <Skeleton className="aspect-square w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}
