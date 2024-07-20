"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"
import { Icons } from "@/components/icons"
import { useRouter } from "next/navigation"
import { WorkspaceUser } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { buttonVariants } from "../plate-ui/button"
import { acceptInviteWorkspace } from "@/lib/workspaceUsers/service"

interface Props {
  workspaceUser: WorkspaceUser
}

export default function WorkspaceAcceptButton({ workspaceUser }: Props) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  async function acceptInvite() {
    try {
      setIsLoading(true)
      const response = await acceptInviteWorkspace(
        workspaceUser.id,
        workspaceUser.workspaceId,
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
