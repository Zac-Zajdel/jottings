"use client"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import { cn } from "@/lib/utils"
import { useState } from "react"
import { User } from "@auth/core/types"
import { Workspace } from "@prisma/client"
import { Icons } from "@/components/icons"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { deleteWorkspace } from "@/lib/workspace/service"
import { Button, buttonVariants } from "@/components/ui/button"

interface DeleteWorkspaceProps {
  user: User & { activeWorkspaceId: string },
  activeWorkspace: Workspace|undefined
}

export function DeleteWorkspace({ user, activeWorkspace }: DeleteWorkspaceProps) {
  const router = useRouter()
  const { update } = useSession()
  const [workspaceName, setWorkspaceName] = useState('')
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)

  async function removeWorkspace(): Promise<Workspace | undefined> {
    try {
      const response = await deleteWorkspace(user.activeWorkspaceId, user.id as string)
      toast({ description: response.message})
      return response.data.workspace
    } catch(e) {
      toast({
        variant: 'destructive',
        description: e?.message ?? 'An issue occurred while deleting your workspace.',
      })
    }
  }

  return (
    <>
      <Card className="bg-red-700/20">
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>Delete Workspace</CardTitle>
              <CardDescription className="pt-2 mr-4">
                This action is irreversible and deletes all content specific to this workspace.
              </CardDescription>
            </div>
            <div>
              <Button
                className={cn(buttonVariants({ variant: "destructive" }))}
                onClick={() => setShowDeleteAlert(true)}
              >
                Delete
              </Button>
            </div>
          </div>
        </CardHeader>
        <div className="border-b"></div>
      </Card>

      <AlertDialog
        open={showDeleteAlert}
        onOpenChange={setShowDeleteAlert}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex justify-center">
              Confirm Deletion of
            </AlertDialogTitle>
            <AlertDialogDescription className="flex justify-center">
              { activeWorkspace?.name }
            </AlertDialogDescription>
            <div className="border-t py-5">
              <Label htmlFor="name">
                Type Workspace Name
              </Label>
              <Input
                id="name"
                placeholder="Type workspace name here..."
                className="mt-2"
                value={workspaceName}
                onChange={(event) => setWorkspaceName(event?.target.value)}
                size={32}
              />
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault()

                if (workspaceName !== activeWorkspace?.name)
                  return toast({
                    variant: 'destructive',
                    description: 'Workspace name does not match',
                  })

                setIsDeleteLoading(true)
                const defaultWorkspace = await removeWorkspace()
                setIsDeleteLoading(false)
                setShowDeleteAlert(false)

                // Update session and invalidate
                if (defaultWorkspace?.id) {
                  await update({ activeWorkspaceId: defaultWorkspace.id })
                  router.refresh()
                }
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
