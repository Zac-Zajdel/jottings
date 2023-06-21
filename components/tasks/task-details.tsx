"use client"

import { useState } from 'react';
import { Task } from "@prisma/client"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Icons } from "@/components/icons"
import TextareaAutosize from "react-textarea-autosize"
import { buttonVariants } from "@/components/ui/button"
import { Editor } from "@/components/editor"

export function TaskDetails({ task} : { task: Task }) {
  const [isSaving, setIsSaving] = useState<boolean>(false)

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
          <p className="text-sm text-muted-foreground">
            {task.published ? "Published" : "Draft"}
          </p>
        </div>
        <button type="submit" className={cn(buttonVariants())}>
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
        />

        <div className="w-full border-b border-opacity-30 border-gray-600"></div>

        <div>
          Due Date: Feb 13th 1998
        </div>
        <div>
          Status: In Progress
        </div>
        <div>
          Created By: Zac Zajdel
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