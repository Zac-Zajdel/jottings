import { DashboardHeader } from "@/components/header"
import { TaskCreateButton } from "@/components/task-create-button"
import { TaskItem } from "@/components/task-item"
import { DashboardShell } from "@/components/shell"

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Tasks" text="Create and manage tasks.">
        <TaskCreateButton />
      </DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border">
        <TaskItem.Skeleton />
        <TaskItem.Skeleton />
        <TaskItem.Skeleton />
        <TaskItem.Skeleton />
        <TaskItem.Skeleton />
      </div>
    </DashboardShell>
  )
}
