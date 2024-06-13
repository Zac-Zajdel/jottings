import { CardSkeleton } from "@/components/card-skeleton"

export default function WorkspaceLoading() {
  return (
    <>
      <div className="grid gap-10 mx-8 mb-3">
        <CardSkeleton />
      </div>

      <div className="grid gap-10 mx-8 mb-3">
        <CardSkeleton />
      </div>
    </>
  )
}
