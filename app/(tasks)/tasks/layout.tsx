import { notFound } from "next/navigation"
import { dashboardConfig } from "@/config/dashboard"
import { getCurrentUser } from "@/lib/session"
import { MainNav } from "@/components/main-nav"
import { DashboardNav } from "@/components/nav"
import { UserAccountNav } from "@/components/user-account-nav"

interface JotsLayoutProps {
  children?: React.ReactNode
}

export default async function TasksLayout({
  children,
}: JotsLayoutProps) {
  const user = await getCurrentUser()
  if (!user) {
    return notFound()
  }

  return (
    <div className="relative flex min-h-screen h-screen overflow-hidden flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="flex h-16 items-center justify-between py-4 px-5">
          <MainNav items={dashboardConfig.mainNav} />
        </div>
      </header>

      <div className="grid flex-1 gap-4 md:grid-cols-[200px_1fr] px-5 h-[1vh]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardConfig.sidebarNav} />
          <div className="flex-1"></div>
          <div className="flex items-center py-3">
            <UserAccountNav
              user={{
                name: user.name,
                image: user.image,
                email: user.email,
              }}
            />
            <span className="pl-3 text-sm text-muted-foreground">
              { user.name }
            </span>
          </div>
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-scroll no-scrollbar">
          {children}
        </main>
      </div>
    </div>
  )
}
