import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { PageHeader } from "@/components/page-header"
import { JotCreateButton } from "@/components/jots/jot-create-button"
import { JotItem } from "@/components/jots/jot-item"
import { PageShell } from "@/components/page-shell"
import { PageBreadcrumbs } from "@/components/page-breadcrumbs"
import { DataTable } from "@/components/table/data-table"
import { columns } from "@/components/table/columns"

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

  const tasks = [
    {
      id: 'TASK 213198',
      title: 'HI ALL',
      status: 'Backlog',
      label: 'DRAFT',
      priority: 'Medium',
    }
  ]

  return (
    <PageShell className="gap-1">
      <PageBreadcrumbs crumbs={[
          {
            link: '/jots',
            title: 'Home',
            icon: 'home',
          },
          {
            link: '/jots',
            title: 'Jots',
          },
        ]}
      />

      <PageHeader
        heading="Jots"
        text="Create and manage Jots."
      >
        <JotCreateButton />
      </PageHeader>

      {/* TESTING THIS OVERALL */}
      <div className="divide-y divide-border rounded-md mx-8 mb-12">
        <DataTable
          data={tasks}
          columns={columns}
        />
      </div>

      <div>
        {jots?.length ? (
          <div className="divide-y divide-border rounded-md border mx-8 mb-12">
            {jots.map((jot) => (
              <JotItem key={jot.id} jot={jot} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder className="mx-8">
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
