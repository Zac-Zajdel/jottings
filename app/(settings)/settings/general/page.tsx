import { User } from "@/types"
import { getCurrentUser } from "@/lib/session"
import { UserNameForm } from "@/components/user-name-form"
import { getWorkspacesByUserId } from "@/lib/workspace/service"
import { SettingsNav } from "@/components/settings/settings-nav"
import { WorkspaceSettings } from "@/components/workspaces/workspace-settings"

export const metadata = {
  title: "General",
  description: "Manage account and workspace settings.",
}

export default async function SettingsGeneral() {
  const user = await getCurrentUser() as User

  const workspaces = await getWorkspacesByUserId(user.id)
  const activeWorkspace = workspaces?.find(space => space.id === user.activeWorkspaceId)

  return (
    <>
      <SettingsNav />

      <div className="grid gap-10 mx-8 mb-3">
        <UserNameForm user={{ id: user.id, name: user.name || "" }} />
      </div>


      {/* TODO: This needs to go to the next page */}
      {!activeWorkspace?.default && (
        <div className="grid gap-10 mx-8">
          <WorkspaceSettings
            user={user}
            activeWorkspace={activeWorkspace}
          />
        </div>
      )}
    </>
  )
}
