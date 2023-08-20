import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { PageHeader } from "@/components/page-header"
import { JotCreateButton } from "@/components/jot-create-button"
import { PageShell } from "@/components/page-shell"
import { TemplateItem } from "@/components/template-item"

export const metadata = {
  title: "Templates",
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
    <PageShell>
      <PageHeader
        heading="Templates"
        text="Create and manage Templates."
      >
        <JotCreateButton />
      </PageHeader>
      <div>
        {templates?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {templates.map((template) => (
              <TemplateItem key={template.id} template={template} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="template" />
            <EmptyPlaceholder.Title>No Templates created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any Templates yet. Start creating content.
            </EmptyPlaceholder.Description>
            <JotCreateButton variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </PageShell>
  )
}
