import { PageShell } from "@/components/page-shell"
import { PageHeader } from "@/components/page-header"
import { CardSkeleton } from "@/components/card-skeleton"
import { PageBreadcrumbs } from "@/components/page-breadcrumbs"
import { SettingsNav } from "@/components/settings/settings-nav"

export default function SettingsLoading() {
  return (
    <PageShell className="gap-1">
      <PageBreadcrumbs crumbs={[
          {
            link: '/settings/general',
            title: 'Home',
            icon: 'home',
          },
          {
            link: '/settings/general',
            title: 'Settings',
          },
        ]}
      />

      <PageHeader
        heading="Settings"
        text="Manage account and workspace settings."
      />

      <SettingsNav />

      <div className="grid gap-10 mx-8 mb-3">
        <CardSkeleton />
      </div>
    </PageShell>
  )
}
