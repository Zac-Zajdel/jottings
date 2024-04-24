import { User } from "@/types"
import { Workspace } from "@prisma/client"
import { setTimeout } from "timers/promises"
import { getWorkspacesByUserId } from "@/lib/workspace/service"
import { WorkspaceUsersTable } from "@/components/workspaces/users/workspace-users-table"

interface WorkspaceUsersProps {
  user: User
  workspace: Workspace
}

export default async function WorkspaceUsers({ user, workspace }: WorkspaceUsersProps) {
  console.log('HERE FINALLY')
  await setTimeout(5000)

  // todo - this will be grabbing members from WorkspaceUsers instead
  // todo - this has a loading animation from Suspense in parent component
  // todo - to progressively load in content.
  // getWorkspaceUsers(workspace.id)
  const workspaceUsers = await getWorkspacesByUserId(user.id)

  return (
    <>
      <WorkspaceUsersTable
        data={[{
          "id": "clvbl6w3k000112ks831wlspr",
          "title": "Test Creation",
          "published": false,
          "createdAt": "2024-04-22T23:26:59.836Z",
          "updatedAt": "2024-04-22T23:26:59.836Z",
          "author": {
            "id": "clvbktm8r000025kh8q0nqbf9",
            "activeWorkspaceId": "clvbktm91000525kh1rch82ie",
            "name": "Zac Zajdel",
            "email": "zaczajdel213@gmail.com",
            "emailVerified": null,
            "image": "https://lh3.googleusercontent.com/a/ACg8ocKZZZrmr_-5RzYFCftYs7wcTBA_abHTBodJXsB-nE5E20oC2WU0=s96-c",
            "createdAt": "2024-04-22T23:16:40.540Z",
            "updatedAt": "2024-04-22T23:16:40.540Z"
          }
        }]}
      />
    </>
  )
}
