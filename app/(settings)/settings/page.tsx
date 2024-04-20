import { User } from "@/types"
import { getCurrentUser } from "@/lib/session"
import { PageShell } from "@/components/page-shell"
import { PageHeader } from "@/components/page-header"
import { UserNameForm } from "@/components/user-name-form"
import { PageBreadcrumbs } from "@/components/page-breadcrumbs"
import { getWorkspacesByUserId } from "@/lib/workspace/service"
import { WorkspaceSettings } from "@/components/workspaces/workspace-settings"

export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
}

export default async function SettingsPage() {
  const user = await getCurrentUser() as User

  const workspaces = await getWorkspacesByUserId(user.id)
  const activeWorkspace = workspaces?.find(space => space.id === user.activeWorkspaceId)

  return (
    <PageShell className="gap-1">
      <PageBreadcrumbs crumbs={[
          {
            link: '/settings',
            title: 'Home',
            icon: 'home',
          },
          {
            link: '/settings',
            title: 'Settings',
          },
        ]}
      />

      <PageHeader
        heading="Settings"
        text="Manage account and website settings."
      />

      <div className="grid gap-10 mx-8 mb-3">
        <UserNameForm user={{ id: user.id, name: user.name || "" }} />
      </div>
      {!activeWorkspace?.default && (
        <div className="grid gap-10 mx-8">
          <WorkspaceSettings
            user={user}
            activeWorkspace={activeWorkspace}
          />
        </div>
      )}

    </PageShell>
  )
}
