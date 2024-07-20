import { Skeleton } from "@/components/ui/skeleton";

export default function TableSkeleton() {
  return (
    <div>
      <div className="flex items-center justify-between pb-3">
        <div className="flex flex-1 items-center justify-between space-x-2">
          <Skeleton className="h-8 w-3/12" />
          <Skeleton className="h-8 w-1/12" />
        </div>
      </div>
      <div className="space-y-3">
        <Skeleton className="h-9" />
        <Skeleton className="h-16" />
      </div>
      <div className="flex items-center justify-end py-3">
        <Skeleton className="h-8 w-2/12 mx-2" />
        <Skeleton className="h-8 w-1/12" />
      </div>
    </div>
  )
}
