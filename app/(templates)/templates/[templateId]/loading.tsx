import { Skeleton } from "@/components/ui/skeleton"
import { PageBreadcrumbs } from "@/components/page-breadcrumbs"

export default function Loading() {
  return (
    <div className="grid gap-10">
      <PageBreadcrumbs crumbs={[
          {
            link: '/templates',
            title: 'Home',
            icon: 'home',
          },
          {
            link: '/templates',
            title: 'Templates',
          },
          {
            link: '/templates/',
            title: '...',
            isCurrentPage: true,
          },
        ]}
      >
        <Skeleton className="h-[38px] w-[80px]" />
      </PageBreadcrumbs>
  
      <div className=" space-y-6 mx-8">
        <Skeleton className="h-[50px] w-1/3" />
        <Skeleton className="h-[20px] w-1/4" />
        <Skeleton className="h-[20px] w-1/4" />
        <Skeleton className="h-[600px] w-full" />
      </div>
    </div>
  )
}
