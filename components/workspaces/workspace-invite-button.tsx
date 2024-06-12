"use client"

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../plate-ui/dialog"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Icons } from "@/components/icons"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { createWorkspaceUser } from "@/lib/workspaceUsers/service"

interface Props {
  workspaceId: string;
}

export default function WorkspaceInviteButton({ workspaceId }: Props) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function inviteUser() {
    try {
      setIsLoading(true)
      const response = await createWorkspaceUser(email, workspaceId)
      toast({ description: response?.message })

      router.refresh()
      setOpen(false)
      setEmail('')
    } catch (e) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: e?.message ?? 'An issue occurred while sending invite.',
      });
    }

    setIsLoading(false)
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className={cn(
              { "cursor-not-allowed opacity-60": isLoading },
            )}
            disabled={isLoading}
          >
            { isLoading
              ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              : <Icons.add className="mr-2 h-4 w-4" />
            }
            Invite
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite user to workspace</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              className="w-[400px]"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event?.target.value)}
              size={32}
            />
          </div>

          <DialogFooter>
            <Button
              disabled={isLoading}
              onClick={inviteUser}
            >
              { isLoading
                ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                : <Icons.add className="mr-2 h-4 w-4" />
              }
              Invite User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
