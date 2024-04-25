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
import { User } from "@/types"
import { useState } from "react"
import { Icons } from "@/components/icons"
import { useRouter } from "next/navigation"
import { WorkspaceUser } from "@prisma/client"
import { toast } from "@/components/ui/use-toast"
import { deleteWorkspaceUser } from "@/lib/workspaceUsers/service"

interface WorkspaceUsersTableProps {
  workspaceUser: Pick<WorkspaceUser, "id" | "userId" | "workspaceId" | "hasAcceptedInvite">
  authenticatedUser: User
}

export function WorkspaceUsersTableOperations({ workspaceUser, authenticatedUser }: WorkspaceUsersTableProps) {
  const router = useRouter()
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)

  async function removeUser(id: string, userId: string) {
    try {
      setIsDeleteLoading(true)

      const response = await deleteWorkspaceUser(id, userId)
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
   * TODO
   * 
   * 1. Have a button for accept invitation if they are invited
   * 2. The dropdown items shouldn't be viewable if the user cannot take said action.
   *    - not owner of workspace and row is another user
   *    - not owner but is the same user and can leave workspace.
   */

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
            Remove Member
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
              Are you sure you want to remove this member?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This user will be removed and all content will be transferred to you.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault()
                await removeUser(workspaceUser.id, workspaceUser.userId)
              }}
              className="bg-red-600 focus:ring-red-600 hover:bg-red-700"
            >
              {isDeleteLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.trash className="mr-2 h-4 w-4" />
              )}
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
