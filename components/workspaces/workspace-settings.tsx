"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button, buttonVariants } from "../ui/button"
import { cn } from "@/lib/utils"
import { toast } from "../ui/use-toast"
import { User } from "next-auth"
import { deleteWorkspace } from "@/lib/workspace/service"
import { useSession } from "next-auth/react"

export function WorkspaceSettings({ user }: { user: User }) {
  const { update } = useSession()

  async function submit() {
    try {
      // todo - maybe the whole workspace needs attached to the next-auth user instead of just the ID?
      // const activeWorkspace = await deleteWorkspace({}, user)
      // await update({ activeWorkspace.data.id })
      toast({ description: "Your Jot has been saved."})
      // todo - route back to Jots in default workspace?
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: 'An error occurred. Please try that again',
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Delete Workspace</CardTitle>
        <CardDescription>
          This action is irreversible and deletes all content specific to this workspace.
        </CardDescription>
      </CardHeader>
      <div className="border-b"></div>
      <CardHeader>
        <CardTitle>Workspace Name</CardTitle>
        <CardDescription>
          Confirm the workspace you want to permanently delete below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="name">
            Name
          </Label>
          <Input
            id="name"
            placeholder="Type workspace name here..."
            className="w-[400px]"
            size={32}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className={cn(buttonVariants({ variant: "destructive" }))}
          onClick={submit}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}
