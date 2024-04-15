import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { PageHeader } from "@/components/page-header"
import { PageShell } from "@/components/page-shell"
import { JotTemplateCreateButton } from "@/components/templates/jot-template-create-button"
import { PageBreadcrumbs } from "@/components/page-breadcrumbs"
import { TemplateTable } from "@/components/templates/table/template-table"
import { unstable_noStore as noStore } from "next/cache"
import { User } from "next-auth"

export const metadata = {
  title: "Templates",
  description: "Create and manage Templates.",
}

type SearchParams = { [key: string]: string | string[] | undefined }
type SessionUser = User & {
  id: string;
  activeWorkspaceId: string;
}

const getTemplates = async (user: SessionUser, searchParams: SearchParams) => {
  return await db.jotTemplate.findMany({
    where: {
      workspaceId: user.activeWorkspaceId,
      ...(
        searchParams?.search
          ? { title: { contains: searchParams.search as string } }
          : {}
      ),
    },
    select: {
      id: true,
      title: true,
      isPublished: true,
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
};

export default async function TemplatesPage({searchParams}: {
  searchParams: SearchParams
}) {
  const user = await getCurrentUser()
  if (!user) redirect(authOptions?.pages?.signIn || "/signin")

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
