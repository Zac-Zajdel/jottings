import Link from "next/link"
import { Jot } from "@prisma/client"

import { formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { JotOperations } from "@/components/jot-operations"

interface JotItemProps {
  jot: Pick<Jot, "id" | "title" | "published" | "createdAt">
}

export function JotItem({ jot }: JotItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/jots/${jot.id}`}
          className="font-semibold hover:underline"
        >
          {jot.title}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDate(jot.createdAt?.toDateString())}
          </p>
        </div>
      </div>
      <JotOperations jot={{ id: jot.id, title: jot.title }} />
    </div>
  )
}

JotItem.Skeleton = function JotItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
