import { PageHeader } from "@/components/page-header"
import { JotCreateButton } from "@/components/jot-create-button"
import { JotItem } from "@/components/jot-item"
import { PageShell } from "@/components/page-shell"

export default function DashboardLoading() {
  return (
    <PageShell>
      <PageHeader
        heading="Jots"
        text="Create and manage jots."
      >
        <JotCreateButton />
      </PageHeader>
      <div className="divide-border-200 divide-y rounded-md border">
        <JotItem.Skeleton />
        <JotItem.Skeleton />
        <JotItem.Skeleton />
        <JotItem.Skeleton />
        <JotItem.Skeleton />
      </div>
    </PageShell>
  )
}
