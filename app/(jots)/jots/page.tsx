import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { PageHeader } from "@/components/page-header"
import { JotCreateButton } from "@/components/jots/jot-create-button"
import { PageShell } from "@/components/page-shell"
import { PageBreadcrumbs } from "@/components/page-breadcrumbs"
import { JotTable } from "@/components/jots/table/jot-table"
import { EmptyPlaceholder } from "@/components/empty-placeholder"

export const metadata = {
  title: "Jots",
  description: "Create and manage Jots.",
}

export default async function JotsPage({searchParams}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const user = await getCurrentUser()
  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const jots = await db.jot.findMany({
    where: {
      authorId: user.id,
      ...(
        searchParams?.search
          ? { title: { contains: searchParams.search as string } }
          : {}
      ),
    },
    select: {
      id: true,
      title: true,
      published: true,
      createdAt: true,
    },
    ...(
      searchParams?.column && searchParams?.order
        ? { orderBy: { [searchParams.column as string]: searchParams.order } }
        : {}
    ),
    skip: Number(searchParams?.skip ?? 0),
    take: Number(searchParams?.take ?? 10),
  })

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

      <div className="divide-y divide-border rounded-md mx-8 mb-12">
        <div className="space-y-4">
          {jots?.length || searchParams?.search ? (
            <JotTable
              data={jots}
            />
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
      </div>
    </PageShell>
  )
}
