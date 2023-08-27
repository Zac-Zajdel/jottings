import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { PageHeader } from "@/components/page-header"
import { PageShell } from "@/components/page-shell"
import { TemplateItem } from "@/components/templates/template-item"
import { JotTemplateCreateButton } from "@/components/templates/jot-template-create-button"
import { PageBreadcrumbs } from "@/components/page-breadcrumbs"

export const metadata = {
  title: "Templates",
  description: "Create and manage Templates.",
}

export default async function TemplatesPage() {
  const user = await getCurrentUser()
  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const templates = await db.jotTemplate.findMany({
    where: {
      authorId: user.id,
    },
    select: {
      id: true,
      title: true,
      isPublished: true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
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

      <div>
        {templates?.length ? (
          <div className="divide-y divide-border rounded-md border mx-8 mb-12">
            {templates.map((template) => (
              <TemplateItem key={template.id} template={template} />
            ))}
          </div>
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
    </PageShell>
  )
}
