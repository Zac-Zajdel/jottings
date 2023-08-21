import Link from "next/link"
import { JotTemplate } from "@prisma/client"
import { formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

interface templateItemProps {
  template: Pick<JotTemplate, "id" | "title" | "isPublished" | "createdAt">
}

export function TemplateItem({ template }: templateItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/templates/${template.id}`}
          className="font-semibold hover:underline"
        >
          {template.title}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDate(template.createdAt?.toDateString())}
          </p>
        </div>
      </div>
    </div>
  )
}

TemplateItem.Skeleton = function TemplateItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
