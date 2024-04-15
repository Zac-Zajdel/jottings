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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useState } from "react"
import { Jot } from "@prisma/client"
import { copyJot, invalidateJots } from "@/actions/jots"
import { Icons } from "@/components/icons"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

interface PostOperationsProps {
  jot: Pick<Jot, "id" | "title">
}

async function deleteJot(jotId: string) {
  const response = await fetch(`/api/jots/${jotId}`, {
    method: "DELETE",
  })

  if (!response?.ok) {
    toast({
      title: "Something went wrong.",
      description: "Your Jot was not deleted. Please try again.",
      variant: "destructive",
    })
  }

  return true
}

export function JotOperations({ jot }: PostOperationsProps) {
  const router = useRouter()
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [isCloneLoading, setIsCloneLoading] = useState(false)
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)

  async function handleCopyJot() {
    try {
      setIsCloneLoading(true)

      const response = await copyJot(jot.id)
      if (response) {
        toast({
          description: response.message
        })
        router.push(`/jots/${response.data.id}`)
      }
    } catch(e) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: e?.message ?? 'An issue occurred while copying your Jot.',
      });
    }

    setIsCloneLoading(false)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
          <Icons.ellipsis className="h-4 w-4" />
          <span className="sr-only">Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link
              href={`/jots/${jot.id}`}
              className="flex w-full"
            >
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            disabled={isCloneLoading}
            className="flex items-center cursor-pointer"
            onSelect={(event) => {
              event.preventDefault()
              handleCopyJot()
            }}
          >
            {isCloneLoading
              ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              : null
            }
            Copy
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            disabled={isCloneLoading}
            className="flex items-center cursor-pointer text-destructive focus:text-destructive"
            onSelect={() => setShowDeleteAlert(true)}
          >
            Delete
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
              Are you sure you want to delete this Jot?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault()
                setIsDeleteLoading(true)

                const deleted = await deleteJot(jot.id)

                if (deleted) {
                  setIsDeleteLoading(false)
                  setShowDeleteAlert(false)
                  await invalidateJots()
                  toast({
                    description: "Your Jot has been deleted.",
                  })
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
