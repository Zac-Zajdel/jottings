import { notFound } from "next/navigation"
import { dashboardConfig } from "@/config/dashboard"
import { getCurrentUser } from "@/lib/session"
import { MainNav } from "@/components/main-nav"
import { DashboardNav } from "@/components/nav"
import { UserAccountNav } from "@/components/user-account-nav"

interface SettingsLayoutProps {
  children?: React.ReactNode
}

export default async function SettingsLayout({
  children,
}: SettingsLayoutProps) {
  const user = await getCurrentUser()
  if (!user) {
    return notFound()
  }

  return (
    <div className="relative flex min-h-screen h-screen overflow-hidden flex-col space-y-6">
      <div className="grid flex-1 md:grid-cols-[215px_1fr] h-[1vh]">
        <aside className="hidden w-[215px] flex-col md:flex">
          <header className="sticky top-0 z-40 bg-background px-2">
            <div className="flex h-14 items-center justify-between py-4 px-3">
              <MainNav items={dashboardConfig.mainNav} />
            </div>
          </header>

          <DashboardNav items={dashboardConfig.sidebarNav} />
          <div className="flex-1 px-2"></div>
          <div className="w-full">
            <UserAccountNav
              user={{
                name: user.name,
                image: user.image,
                email: user.email,
              }}
            />
          </div>
        </aside>
        <main className="flex flex-1 border rounded-2xl m-3 flex-col overflow-scroll no-scrollbar">
          {children}
        </main>
      </div>
    </div>
  )
}
