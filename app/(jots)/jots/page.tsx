import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { PageHeader } from "@/components/page-header"
import { JotCreateButton } from "@/components/jots/jot-create-button"
import { JotItem } from "@/components/jots/jot-item"
import { PageShell } from "@/components/page-shell"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumbs"
import { Icons } from "@/components/icons"

export const metadata = {
  title: "Jots",
  description: "Create and manage Jots.",
}

export default async function JotsPage() {
  const user = await getCurrentUser()
  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const jots = await db.jot.findMany({
    where: {
      authorId: user.id,
    },
    select: {
      id: true,
      title: true,
      published: true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })

  return (
    <PageShell className="gap-1">
      <header className="sticky top-0 z-40 bg-background border-b">
        <div className="flex h-14 items-center justify-between mx-4">
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="/jots">Jots</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
      </header>
      <PageHeader
        heading="Jots"
        text="Create and manage Jots."
      >
        <JotCreateButton />
      </PageHeader>
      <div>
        {jots?.length ? (
          <div className="divide-y divide-border rounded-md border mx-8 mb-12">
            {jots.map((jot) => (
              <JotItem key={jot.id} jot={jot} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="file" />
            <EmptyPlaceholder.Title>No Jots created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any Jots yet. Start creating content.
            </EmptyPlaceholder.Description>
            <JotCreateButton />
          </EmptyPlaceholder>
        )}
      </div>
    </PageShell>
  )
}
