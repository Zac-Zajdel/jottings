import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { EmptyPlaceholder } from "@/components/empty-placeholder"

export default function NotFound() {
  return (
    <div className="flex h-screen m-auto">
      <div className="m-auto">
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="warning" />
          <EmptyPlaceholder.Title>Jot Not Found</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            This Jot could not be found. Please try again.
          </EmptyPlaceholder.Description>
          <Link
            href="/jots"
            className={buttonVariants({ variant: "ghost" })}
          >
            Go to List View
          </Link>
        </EmptyPlaceholder>
      </div>
    </div>
  )
}
