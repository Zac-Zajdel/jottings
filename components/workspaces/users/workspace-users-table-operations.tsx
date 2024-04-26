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
import { useState } from "react"
import { Icons } from "@/components/icons"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { Workspace, WorkspaceUser } from "@prisma/client"
import { deleteWorkspaceUser } from "@/lib/workspaceUsers/service"

interface WorkspaceUsersTableProps {
  workspaceUser: Pick<WorkspaceUser, "id" | "userId" | "workspaceId" | "hasAcceptedInvite">
  workspace: Workspace
}

export function WorkspaceUsersTableOperations({ workspaceUser, workspace }: WorkspaceUsersTableProps) {
  const router = useRouter()
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)

  async function removeUser() {
    try {
      setIsDeleteLoading(true)

      const response = await deleteWorkspaceUser(workspaceUser.id, workspace)
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
            { !workspaceUser.hasAcceptedInvite ? 'Revoke Invite' : 'Remove Member' }
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
              Are you sure you want to remove?
            </AlertDialogTitle>
            <AlertDialogDescription>
            { workspaceUser.hasAcceptedInvite
              ? 'This user will be removed and all content will be transferred to you.'
              : 'This user will no longer be able to join your workspace.'
            }
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
              <span>Remove</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
