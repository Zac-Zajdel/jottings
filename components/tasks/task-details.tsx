"use client"

import { useState } from 'react';
import { Task } from "@prisma/client"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Icons } from "@/components/icons"
import TextareaAutosize from "react-textarea-autosize"
import { buttonVariants } from "@/components/ui/button"
import { Editor } from "@/components/editor"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import * as z from "zod"

import { useForm } from "react-hook-form"
import { taskPatchSchema } from "@/lib/validations/task"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "@/components/ui/use-toast"

type FormData = z.infer<typeof taskPatchSchema>

export function TaskDetails({ task, user }: { task: Task, user: any }) {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(taskPatchSchema),
  })

  async function onSubmit() {
    console.log('HERE')
    setIsSaving(true)

    const blocks = {} //await ref.current?.save()

    const response = await fetch(`/api/tasks/${task.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: task.title,
        content: task.content,
      }),
    })

    setIsSaving(false)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your task was not saved. Please try again.",
        variant: "destructive",
      })
    }

    router.refresh()

    return toast({
      description: "Your task has been saved.",
    })
  }

  return (
    <div className="grid w-full gap-10">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center space-x-10">
          <Link
            href="/dashboard"
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            <>
              <Icons.chevronLeft className="mr-2 h-4 w-4" />
              Back
            </>
          </Link>
        </div>
        <button onClick={() => onSubmit()} className={cn(buttonVariants())}>
          {isSaving && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          <span>Save</span>
        </button>
      </div>

      <div className="prose prose-stone mx-auto w-[800px] dark:prose-invert">
        <TextareaAutosize
          autoFocus
          id="title"
          defaultValue={task.title}
          placeholder="Task title"
          className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
          {...register("title")}
        />

        <div className="w-full border-b border-opacity-30 border-gray-600 mb-2" />

        <div className="flex items-center">
          Due date
          <span className="ml-4">{task.dueAt?.toLocaleString()}</span>
        </div>
        <div className="flex items-center">
          Status
          <span className="ml-4">{task.status}</span>
        </div>
        <div className="flex items-center">
          Created by
          <Avatar className="h-8 w-8 ml-4">
            <AvatarImage
              className="mt-0"
              src={user?.image ?? ""}
              alt={user?.name ?? ""}
            />
            <AvatarFallback>{user.name}</AvatarFallback>
          </Avatar>
        </div>

        <Editor
          task={{
            id: task.id,
            title: task.title,
            content: task.content,
            published: task.published,
          }}
        />
      </div>
    </div>
  )
}