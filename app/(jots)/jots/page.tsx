import { db } from "@/lib/db"
import { SearchParams, User } from "@/types"
import { getCurrentUser } from "@/lib/session"
import { PageShell } from "@/components/page-shell"
import { PageHeader } from "@/components/page-header"
import { unstable_noStore as noStore } from "next/cache"
import { JotTable } from "@/components/jots/table/jot-table"
import { PageBreadcrumbs } from "@/components/page-breadcrumbs"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { JotCreateButton } from "@/components/jots/jot-create-button"

export const metadata = {
  title: "Jots",
  description: "Create and manage Jots.",
}

const getJots = async (user: User, searchParams: SearchParams) => {
  return await db.jot.findMany({
    where: {
      workspaceId: user.activeWorkspaceId,
      ...(searchParams?.search ? {
        OR: [
          {
            title: {
              contains: searchParams.search as string,
              mode: 'insensitive',
            }
          },
          {
            author: {
              name: {
                contains: searchParams.search as string,
                mode: 'insensitive',
              }
            }
          }
        ]
      } : {})
    },
    select: {
      id: true,
      title: true,
      published: true,
      createdAt: true,
      updatedAt: true,
      author: true,
    },
    ...(
      searchParams?.column && searchParams?.order
        ? { orderBy: { [searchParams.column as string]: searchParams.order } }
        : {}
    ),
    skip: Number(searchParams?.skip ?? 0),
    take: Number(searchParams?.take ?? 10),
  })
};

export default async function JotsPage({searchParams}: {
  searchParams: SearchParams
}) {
  const user = await getCurrentUser() as User

  await noStore();
  const jots = await getJots(user, searchParams)

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
