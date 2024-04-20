import { db } from "@/lib/db"
import { SearchParams, User } from "@/types"
import { getCurrentUser } from "@/lib/session"
import { PageShell } from "@/components/page-shell"
import { PageHeader } from "@/components/page-header"
import { unstable_noStore as noStore } from "next/cache"
import { PageBreadcrumbs } from "@/components/page-breadcrumbs"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { TemplateTable } from "@/components/templates/table/template-table"
import { JotTemplateCreateButton } from "@/components/templates/jot-template-create-button"

export const metadata = {
  title: "Templates",
  description: "Create and manage Templates.",
}

const getTemplates = async (user: User, searchParams: SearchParams) => {
  return await db.jotTemplate.findMany({
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
      isPublished: true,
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

export default async function TemplatesPage({searchParams}: {
  searchParams: SearchParams
}) {
  const user = await getCurrentUser() as User

  await noStore();
  const templates = await getTemplates(user, searchParams)

  return (
    <PageShell className="gap-1">
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
        ]}
      />

      <PageHeader
        heading="Templates"
        text="Create and manage Templates."
      >
        <JotTemplateCreateButton />
      </PageHeader>

      <div className="divide-y divide-border rounded-md mx-8 mb-12">
        <div className="space-y-4">
        {templates?.length || searchParams?.search ? (
          <TemplateTable
            data={templates}
          />
        ) : (
          <EmptyPlaceholder className="mx-8">
            <EmptyPlaceholder.Icon name="template" />
            <EmptyPlaceholder.Title>No Templates created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any Templates yet. Start creating content.
            </EmptyPlaceholder.Description>
            <JotTemplateCreateButton />
          </EmptyPlaceholder>
        )}
        </div>
      </div>
    </PageShell>
  )
}
