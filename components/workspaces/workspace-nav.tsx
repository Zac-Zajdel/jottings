import { WorkspaceItems } from "./workspace-items"
import { getWorkspacesByUserId } from "@/lib/workspace/service"

interface WorkspaceNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: {
    id: string
    activeWorkspaceId: string
  }
}

export default async function WorkspaceNav({ user }: WorkspaceNavProps) {
  const workspaces = await getWorkspacesByUserId(user.id)

  return (
    <div className="flex items-center justify-between space-x-4">
      <WorkspaceItems
        user={{
          id: user.id,
          activeWorkspaceId: user.activeWorkspaceId,
        }}
        workspaces={workspaces}
      />
    </div>
  )
}
