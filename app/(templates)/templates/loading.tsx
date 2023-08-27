import { JotItem } from "@/components/jots/jot-item"
import { PageBreadcrumbs } from "@/components/page-breadcrumbs"
import { PageHeader } from "@/components/page-header"
import { PageShell } from "@/components/page-shell"
import { JotTemplateCreateButton } from "@/components/templates/jot-template-create-button"

export default function TemplatesLoading() {
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
        text="Templates to get up and running quickly."
      >
        <JotTemplateCreateButton />
      </PageHeader>

      <div className="divide-border-200 divide-y rounded-md border mx-8">
        <JotItem.Skeleton />
        <JotItem.Skeleton />
        <JotItem.Skeleton />
        <JotItem.Skeleton />
        <JotItem.Skeleton />
      </div>
    </PageShell>
  )
}
