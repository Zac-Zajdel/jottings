import { PageShell } from "@/components/page-shell"
import { JotItem } from "@/components/jots/jot-item"
import { PageHeader } from "@/components/page-header"
import { JotCreateButton } from "@/components/jots/jot-create-button"

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
