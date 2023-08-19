import { DashboardHeader } from "@/components/header"
import { JotCreateButton } from "@/components/jot-create-button"
import { JotItem } from "@/components/jot-item"
import { DashboardShell } from "@/components/shell"

export default function ProjectsLanding() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Projects"
        text="Create and manage projects."
      >
        <JotCreateButton />
      </DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border">
        <JotItem.Skeleton />
        <JotItem.Skeleton />
        <JotItem.Skeleton />
        <JotItem.Skeleton />
        <JotItem.Skeleton />
      </div>
    </DashboardShell>
  )
}
