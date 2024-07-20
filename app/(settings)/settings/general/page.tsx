import { User } from "@/types"
import { Suspense } from "react"
import { getCurrentUser } from "@/lib/session"
import { UserNameForm } from "@/components/user-name-form"
import TableSkeleton from "@/components/table/table-skeleton"
import { WorkspaceInvites } from "@/components/workspaces/workspace-invites"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "General",
  description: "Manage account and workspace settings.",
}

export default async function SettingsGeneral() {
  const user = await getCurrentUser() as User

  return (
    <>
      <div className="grid gap-10 mx-8 mb-3">
        <UserNameForm
          user={{ id: user.id, name: user.name || "" }}
        />

        <Card>
          <div className="flex items-center justify-between">
            <CardHeader>
              <CardTitle>Invites</CardTitle>
              <CardDescription>
                Invites to collaborate with another workspace.
              </CardDescription>
            </CardHeader>
          </div>
          <CardContent>
            <Suspense fallback={<TableSkeleton />}>
              {/* @ts-ignore @ts-expect-error Server Component */}
              <WorkspaceInvites
                user={user}
              />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
