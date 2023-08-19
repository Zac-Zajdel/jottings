import { PageHeader } from "@/components/page-header"
import { JotCreateButton } from "@/components/jot-create-button"
import { JotItem } from "@/components/jot-item"
import { PageShell } from "@/components/page-shell"

export default function ProjectsLanding() {
  return (
    <PageShell>
      <PageHeader
        heading="Projects"
        text="Create and manage projects."
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
