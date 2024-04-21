import { PageShell } from "@/components/page-shell"
import { JotItem } from "@/components/jots/jot-item"
import { PageHeader } from "@/components/page-header"
import { PageBreadcrumbs } from "@/components/page-breadcrumbs"
import { JotCreateButton } from "@/components/jots/jot-create-button"

export default function JotsLanding() {
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
        text="Create and manage jots."
      >
        <JotCreateButton />
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
