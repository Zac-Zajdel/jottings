
import { db } from "@/lib/db"
import { User } from "@/types"
import { unstable_noStore as noStore } from "next/cache"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../table/table"
import { Workspace } from "@prisma/client";
import { formatDate } from "@/lib/utils";
import WorkspaceAcceptButton from "./workspace-accept-button";
import { EmptyPlaceholder } from "../empty-placeholder";

const getWorkspaceInvites = async (user: User) => {
  return await db.workspaceUser.findMany({
    where: {
      userId: user.id,
      hasAcceptedInvite: false,
    },
    include: {
      workspace: {
        include: {
          owner: true,
        },
      },
    },
    take: 100,
  })
};

interface Props {
  user: User;
  workspace: Workspace;
}

export async function WorkspaceInvites({ user, workspace }: Props) {
  await noStore();
  const invites = await getWorkspaceInvites(user)

  return (
    <div className="border rounded-md">
      {invites.length ?
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="p-3 pl-5">Workspace</TableHead>
              <TableHead className="p-3">Inviter</TableHead>
              <TableHead className="p-3">Sent On</TableHead>
              <TableHead className="p-3"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invites.length
              ? invites.map((invite) => (
                  <TableRow key={invite.id}>
                    <TableCell className="py-8 px-5 w-[20rem]">{invite.workspace?.name}</TableCell>
                    <TableCell>{invite?.workspace?.owner?.name}</TableCell>
                    <TableCell>{formatDate(invite?.createdAt?.toDateString(), 'ddd, MMM D, YYYY')}</TableCell>
                    <TableCell>
                      <WorkspaceAcceptButton
                        workspaceUser={invite}
                        workspace={workspace}
                      />
                    </TableCell>
                  </TableRow>
                ))
              : <TableRow>
                  <TableCell className="py-8 px-5 w-[20rem]">Empty</TableCell>
                </TableRow>
            }
          </TableBody>
        </Table>
      : 
        <EmptyPlaceholder className="min-h-[200px]">
          <EmptyPlaceholder.Icon name="file" />
          <EmptyPlaceholder.Title>No Invites</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            No invites for you to join another users workspace available.
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
      }
    </div>
  )
}
