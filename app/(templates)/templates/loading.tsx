import { CardSkeleton } from "@/components/card-skeleton"
import { PageHeader } from "@/components/page-header"
import { PageShell } from "@/components/page-shell"

export default function TemplatesLoading() {
  return (
    <PageShell>
      <PageHeader
        heading="Templates"
        text="Templates to get up and running quickly."
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </PageShell>
  )
}
