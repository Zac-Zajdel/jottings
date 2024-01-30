import { notFound } from "next/navigation"
import { dashboardConfig } from "@/config/dashboard"
import { getCurrentUser } from "@/lib/session"
import { DashboardNav } from "@/components/nav"
import { UserAccountNav } from "@/components/user-account-nav"
import { WorkspaceNav } from "@/components/workspace-nav"
import { getWorkspacesByUserId } from "@/lib/workspace/service"

interface SettingsLayoutProps {
  children?: React.ReactNode
}

export default async function SettingsLayout({
  children,
}: SettingsLayoutProps) {
  const user = await getCurrentUser()
  if (!user) return notFound()

  const workspaces = await getWorkspacesByUserId(user.id)

  return (
    <div className="relative flex min-h-screen h-screen overflow-hidden flex-col space-y-6 bg-core">
      <div className="grid flex-1 md:grid-cols-[215px_1fr] h-[1vh]">
        <aside className="hidden w-[215px] flex-col md:flex mb-3">
          <div className="pt-1 pl-2">
            <div className="w-full border-b">
              <WorkspaceNav
                user={{
                  id: user.id,
                  activeWorkspaceId: user.activeWorkspaceId,
                }}
                workspaces={workspaces}
              />
            </div>
          </div>

          <DashboardNav items={dashboardConfig.sidebarNav} />
          <div className="flex-1 px-2"></div>
          <div className="pl-2">
            <div className="w-full border rounded-lg">
              <UserAccountNav
                user={{
                  name: user.name,
                  image: user.image,
                  email: user.email,
                }}
              />
            </div>
          </div>
        </aside>
        <main className="flex flex-1 border rounded-xl bg-background m-3 flex-col overflow-scroll no-scrollbar">
          {children}
        </main>
      </div>
    </div>
  )
}
