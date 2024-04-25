import { db } from "@/lib/db"
import { Workspace } from "@prisma/client"
import { SearchParams, User } from "@/types"
import { unstable_noStore as noStore } from "next/cache"
import { WorkspaceUsersTable } from "@/components/workspaces/users/workspace-users-table"

interface WorkspaceUsersProps {
  user: User
  workspace: Workspace
  searchParams: SearchParams
}

const getWorkspaceUsers = async (user: User, searchParams: SearchParams) => {
  return await db.workspaceUser.findMany({
    where: {
      workspaceId: user.activeWorkspaceId,
      ...(searchParams?.search ? {
        user: {
          name: {
            contains: searchParams.search as string,
            mode: 'insensitive',
          }
        }
      } : {})
    },
    select: {
      id: true,
      userId: true,
      workspaceId: true,
      hasAcceptedInvite: true,
      createdAt: true,
      user: true,
    },
    ...(
      searchParams?.column === 'name' && searchParams?.order ? {
        orderBy: { 
          user: {
            name: searchParams.order as 'asc'|'desc',
          },
        }
      } : {}
    ),
    skip: Number(searchParams?.skip ?? 0),
    take: Number(searchParams?.take ?? 10),
  })
};

export default async function WorkspaceUsers({ user, workspace, searchParams }: WorkspaceUsersProps) {
  await noStore();
  const workspaceUsers = await getWorkspaceUsers(user, searchParams)

  return (
    <>
      <WorkspaceUsersTable
        data={workspaceUsers}
        user={user}
      />
    </>
  )
}
