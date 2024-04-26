import { db } from "@/lib/db"
import { SearchParams, User } from "@/types"
import { unstable_noStore as noStore } from "next/cache"
import { WorkspaceUsersTable } from "@/components/workspaces/users/workspace-users-table"

interface WorkspaceUsersProps {
  authUser: User
  searchParams: SearchParams
}

const getWorkspaceUsers = async (authUser: User, searchParams: SearchParams) => {
  return await db.workspaceUser.findMany({
    where: {
      workspaceId: authUser.activeWorkspaceId,
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
      workspace: true,
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

export default async function WorkspaceUsers({ authUser, searchParams }: WorkspaceUsersProps) {
  await noStore();
  const workspaceUsers = await getWorkspaceUsers(authUser, searchParams)

  return (
    <>
      <WorkspaceUsersTable
        data={workspaceUsers}
      />
    </>
  )
}
