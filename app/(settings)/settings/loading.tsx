import { CardSkeleton } from "@/components/card-skeleton"
import { PageHeader } from "@/components/page-header"
import { PageShell } from "@/components/page-shell"

export default function SettingsLoading() {
  return (
    <PageShell>
      <PageHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </PageShell>
  )
}
