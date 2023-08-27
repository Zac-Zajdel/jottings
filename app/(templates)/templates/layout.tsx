import { notFound } from "next/navigation"
import { dashboardConfig } from "@/config/dashboard"
import { getCurrentUser } from "@/lib/session"
import { MainNav } from "@/components/main-nav"
import { DashboardNav } from "@/components/nav"
import { UserAccountNav } from "@/components/user-account-nav"

interface TemplateLayoutProps {
  children?: React.ReactNode
}

export default async function TemplateLayout({
  children,
}: TemplateLayoutProps) {
  const user = await getCurrentUser()
  if (!user) {
    return notFound()
  }

  return (
    <div className="relative flex min-h-screen h-screen overflow-hidden flex-col space-y-6">
      <div className="grid flex-1 md:grid-cols-[215px_1fr] h-[1vh]">
        <aside className="hidden w-[215px] flex-col px-2 md:flex">
          <header className="sticky top-0 z-40 bg-background">
            <div className="flex h-14 items-center justify-between py-4 px-3">
              <MainNav items={dashboardConfig.mainNav} />
            </div>
          </header>

          <DashboardNav items={dashboardConfig.sidebarNav} />
          <div className="flex-1"></div>
          <div className="flex items-center py-3 mx-3">
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
        <main className="flex w-full flex-1 border-l flex-col overflow-scroll no-scrollbar">
          {children}
        </main>
      </div>
    </div>
  )
}
