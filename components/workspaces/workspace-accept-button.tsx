"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"
import { Icons } from "@/components/icons"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { buttonVariants } from "../plate-ui/button"
import { Workspace, WorkspaceUser } from "@prisma/client"
import { acceptInviteWorkspace } from "@/lib/workspaceUsers/service"

interface Props {
  workspaceUser: WorkspaceUser
  workspace: Workspace
}

export default function WorkspaceAcceptButton({ workspaceUser, workspace }: Props) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  async function acceptInvite() {
    try {
      setIsLoading(true)
      const response = await acceptInviteWorkspace(
        workspaceUser.id,
        workspace.id,
      )
      toast({ description: response?.message })

      router.refresh()
    } catch (e) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: e?.message ?? 'An issue occurred while accepting invite.',
      });
    }

    setIsLoading(false)
  }

  return (
    <Button
      className={cn(
        buttonVariants({ size: "xs" }),
      )}
      disabled={isLoading}
      onClick={acceptInvite}
    >
      { isLoading
        ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        : null
      }
      Accept
    </Button>
  )
}
