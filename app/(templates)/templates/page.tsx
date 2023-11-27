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

export const metadata = {
  title: "Templates",
  description: "Create and manage Templates.",
}

export default async function TemplatesPage({searchParams}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const user = await getCurrentUser()
  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const templates = await db.jotTemplate.findMany({
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
