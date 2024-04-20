import { User } from "@/types"
import { getCurrentUser } from "@/lib/session"
import { DashboardNav } from "@/components/nav"
import { dashboardConfig } from "@/config/dashboard"
import { UserAccountNav } from "@/components/user-account-nav"
import WorkspaceNav from "@/components/workspaces/workspace-nav"

interface TemplatesLayoutProps {
  children?: React.ReactNode
}

export default async function TemplatesLayout({
  children,
}: TemplatesLayoutProps) {
  const user = await getCurrentUser() as User

  return (
    <div className="relative flex min-h-screen h-screen overflow-hidden flex-col space-y-6 bg-core">
      <div className="grid flex-1 md:grid-cols-[215px_1fr] h-[1vh]">
        <aside className="hidden w-[215px] flex-col md:flex mb-3">
          <div className="pt-1 pl-2">
            <div className="w-full border-b">
              {/* @ts-ignore @ts-expect-error Server Component */}
              <WorkspaceNav
                user={{
                  id: user.id,
                  activeWorkspaceId: user.activeWorkspaceId,
                }}
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
