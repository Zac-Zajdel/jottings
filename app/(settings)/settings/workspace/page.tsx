import { User } from "@/types"
import { getCurrentUser } from "@/lib/session"
import { UserNameForm } from "@/components/user-name-form"
import { getWorkspacesByUserId } from "@/lib/workspace/service"
import { DeleteWorkspace } from "@/components/workspaces/delete-workspace"

export const metadata = {
  title: "Workspace",
  description: "Manage account and workspace settings.",
}

export default async function SettingsGeneral() {
  const user = await getCurrentUser() as User

  const workspaces = await getWorkspacesByUserId(user.id)
  const activeWorkspace = workspaces?.find(space => space.id === user.activeWorkspaceId)

  return (
    <>
      <div className="grid gap-10 mx-8 mb-3">
        {/* Workspace Name Form? */}
        <UserNameForm user={{ id: user.id, name: user.name || "" }} />
      </div>

      <div className="grid gap-10 m-8">
        <div>
          Workspace Users Placeholder
        </div>
      </div>

      {!activeWorkspace?.default && (
        <div className="grid gap-10 mx-8">
          <DeleteWorkspace
            user={user}
            activeWorkspace={activeWorkspace}
          />
        </div>
      )}
    </>
  )
}
