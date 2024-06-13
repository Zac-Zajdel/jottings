"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User } from "next-auth"
import { Icons } from "@/components/icons"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { toast } from "@/components/ui/use-toast"
import { Workspace, WorkspaceUser } from "@prisma/client"
import { revalidateWorkspaceCache } from "@/lib/workspace/service"
import { deleteWorkspaceUser } from "@/lib/workspaceUsers/service"

interface WorkspaceUsersTableProps {
  workspaceUser: Pick<WorkspaceUser, "id" | "userId" | "workspaceId" | "hasAcceptedInvite">
  workspace: Workspace
  sessionUser: User
}

export function WorkspaceUsersTableOperations({ workspaceUser, workspace, sessionUser }: WorkspaceUsersTableProps) {
  const router = useRouter()
  const { update } = useSession()
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)
  const [labels, setLabels] = useState({
    label: '',
    title: '',
    description: '',
    button: '',
  });

  useEffect(() => {
    let labelOptions = { label: '', title: '', description: '', button: '' };

    if (sessionUser.id === workspaceUser.userId) {
      labelOptions = {
        label: 'Leave Workspace',
        title: 'Leave Workspace',
        description: 'Are you sure you want to leave the workspace?',
        button: 'Leave',
      };
    } else if (!workspaceUser.hasAcceptedInvite) {
      labelOptions = {
        label: 'Revoke Invite',
        title: 'Revoke Invitation',
        description: 'Are you sure you want to revoke the invitation for this user?',
        button: 'Revoke',
      };
    } else {
      labelOptions = {
        label: 'Remove Member',
        title: 'Remove Member',
        description: 'Are you sure you want to remove this member from the workspace?',
        button: 'Remove',
      };
    }

    setLabels(labelOptions);
  }, [sessionUser.id, workspaceUser.userId, workspaceUser.hasAcceptedInvite]);

  async function removeUser() {
    try {
      setIsDeleteLoading(true)
      const isWorkspaceOwner = sessionUser.id === workspace.ownerId

      const response = await deleteWorkspaceUser(
        workspaceUser.id,
        workspace,
        isWorkspaceOwner,
      )

      // If a user leaves the workspace, their session and cached workspaces need updated.
      if (!isWorkspaceOwner && response.data?.defaultWorkspace) {
        await update({ activeWorkspaceId: response.data.defaultWorkspace.id })
        if (sessionUser?.id)
          await revalidateWorkspaceCache(sessionUser.id)
      }

      if (response) {
        router.refresh()
        toast({ description: response?.message })
      }
    } catch (e) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: e?.message ?? 'An issue occurred while removing member.',
      });
    }

    setIsDeleteLoading(false)
    setShowDeleteAlert(false)
  }

  /**
   * Each workspace MUST have an owner.
   * Therefore owners cannot remove themselves before transferring.
   */
  if (workspaceUser.userId === workspace.ownerId)
    return null

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted"
        >
          <Icons.ellipsis className="h-4 w-4" />
          <span className="sr-only">Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="flex items-center cursor-pointer text-destructive focus:text-destructive"
            onSelect={() => setShowDeleteAlert(true)}
          >
            { labels.label }
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog
        open={showDeleteAlert}
        onOpenChange={setShowDeleteAlert}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              { labels.title }
            </AlertDialogTitle>
            <AlertDialogDescription>
            { labels.description }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault()
                await removeUser()
              }}
              className="bg-red-600 focus:ring-red-600 hover:bg-red-700 text-primary"
            >
              {isDeleteLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.trash className="mr-2 h-4 w-4" />
              )}
              <span>{ labels.button }</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
