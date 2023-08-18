import { notFound, redirect } from "next/navigation"
import { Task, User } from "@prisma/client"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import DocumentEditor from "@/components/document-editor"
import { MyValue } from "@/types/plate-types"

async function getTaskForUser(taskId: Task["id"], userId: User["id"]) {
  return await db.task.findFirst({
    where: {
      id: taskId,
      authorId: userId,
    },
  })
}

interface EditorPageProps {
  params: { taskId: string }
}

export default async function EditorPage({ params }: EditorPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const task = await getTaskForUser(params.taskId, user.id)
  if (!task) {
    notFound()
  }

  return (
    <DocumentEditor
      task={{
        id: task.id,
        title: task.title,
        content: task.content as MyValue,
        createdAt: task.createdAt,
        published: task.published,
      }}
    />
  )
}
