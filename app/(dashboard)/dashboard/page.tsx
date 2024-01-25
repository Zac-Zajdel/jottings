import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { PageHeader } from "@/components/page-header"
import { JotCreateButton } from "@/components/jots/jot-create-button"
import { JotItem } from "@/components/jots/jot-item"
import { PageShell } from "@/components/page-shell"

export const metadata = {
  title: "Dashboard",
  description: "Create and manage Dashboard.",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()
  if (!user) {
    redirect(authOptions?.pages?.signIn || "/signin")
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
    <PageShell className="gap-4">
      <PageHeader
        heading="Jots"
        text="Create and manage jots."
      >
        <JotCreateButton />
      </PageHeader>
      <div>
        {jots?.length ? (
          <div className="divide-y divide-border rounded-md border mb-12">
            {jots.map((jot) => (
              <JotItem key={jot.id} jot={jot} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="file" />
            <EmptyPlaceholder.Title>No Jots created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any jots yet. Start creating content.
            </EmptyPlaceholder.Description>
            <JotCreateButton />
          </EmptyPlaceholder>
        )}
      </div>
    </PageShell>
  )
}
