"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import * as z from "zod"
import { User } from "next-auth"
import { cn } from "@/lib/utils"
import { useForm } from "react-hook-form"
import { Icons } from "@/components/icons"
import { Workspace } from "@prisma/client"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { buttonVariants } from "@/components/ui/button"
import { updateWorkspace } from "@/lib/workspace/service"

interface WorkspaceDetailsProps {
  workspace: Workspace | undefined
  user: User
}

const workspaceSchema = z.object({
  name: z.string().min(3).max(32),
})

type FormData = z.infer<typeof workspaceSchema>

export default function WorkspaceDetails({ workspace, user }: WorkspaceDetailsProps) {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: workspace?.name || "",
    },
  })
  const [isSaving, setIsSaving] = useState(false)

  // Used to updated the form input when changing workspaces.
  useEffect(() => {
    setValue('name', workspace?.name ?? '')
  }, [workspace])

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    const response = await updateWorkspace(
      workspace as Workspace,
      user.id as string,
      data.name,
    )

    setIsSaving(false)
    toast({ description: response.message })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Workspace Name</CardTitle>
          <CardDescription>
            {workspace?.default ? 'Private workspace cannot be altered.' : 'This will be viewable to all workspace members.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              className="w-[400px]"
              size={32}
              disabled={workspace?.default || workspace?.ownerId !== user.id}
              {...register("name")}
            />
            {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>
        </CardContent>
        { workspace?.ownerId === user.id &&
          <CardFooter>
            <button
              type="submit"
              className={cn(buttonVariants())}
              disabled={isSaving || workspace?.default || workspace?.ownerId !== user.id}
            >
              {isSaving && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              <span>Save</span>
            </button>
          </CardFooter>
        }
      </Card>
    </form>
  )
}