import { User } from "@/types"
import { Suspense } from 'react'
import { Workspace } from "@prisma/client"
import { getCurrentUser } from "@/lib/session"
import { JotItem } from "@/components/jots/jot-item"
import { getWorkspacesByUserId } from "@/lib/workspace/service"
import WorkspaceDetails from "@/components/workspaces/workspace-details"
import { DeleteWorkspace } from "@/components/workspaces/delete-workspace"
import WorkspaceUsers from "@/components/workspaces/users/workspace-users"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "Workspace",
  description: "Manage account and workspace settings.",
}

export default async function SettingsGeneral() {
  const user = await getCurrentUser() as User

  const workspaces = await getWorkspacesByUserId(user.id)
  const activeWorkspace = workspaces?.find(space => space.id === user.activeWorkspaceId) as Workspace

  return (
    <>
      <div className="grid gap-10 mx-8 mb-3">
        <WorkspaceDetails
          workspace={activeWorkspace}
          user={user}
        />
      </div>

      {!activeWorkspace?.default && (
        <div className="grid gap-10 mx-8 mb-3">
        <Card>
          <CardHeader>
            <CardTitle>Members</CardTitle>
            <CardDescription>
              Members will have access to all Jots and Templates.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={
              // This needs to be custom to show those that card with the table cells.
              // Make this be as close to the UI as possible.
              // Grab useTimeout to give me time for showing exactly what those loaders should contain
              // todo - also create file structure for loading screens.
              <div className="grid gap-10 mx-8 my-3">
                <div className="divide-border-200 divide-y rounded-md border">
                  <JotItem.Skeleton />
                  <JotItem.Skeleton />
                </div>
              </div>
            }>
              {/* @ts-ignore @ts-expect-error Server Component */}
              <WorkspaceUsers
                user={user}
                workspace={activeWorkspace}
              />
            </Suspense>
          </CardContent>
        </Card>
      </div>
      )}

      {!activeWorkspace?.default && (
        <div className="grid gap-10 mx-8 mb-10">
          <DeleteWorkspace
            user={user}
            activeWorkspace={activeWorkspace}
          />
        </div>
      )}
    </>
  )
}
