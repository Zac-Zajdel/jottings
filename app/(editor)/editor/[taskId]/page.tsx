import { notFound, redirect } from "next/navigation"
import { Jot, User } from "@prisma/client"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import DocumentEditor from "@/components/document-editor"
import { MyValue } from "@/types/plate-types"

async function getJotForUser(jotId: Jot["id"], userId: User["id"]) {
  return await db.jot.findFirst({
    where: {
      id: jotId,
      authorId: userId,
    },
  })
}

interface EditorPageProps {
  params: { jotId: string }
}

export default async function EditorPage({ params }: EditorPageProps) {
  const user = await getCurrentUser()
  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const jot = await getJotForUser(params.jotId, user.id)
  if (!jot) {
    notFound()
  }

  return (
    <DocumentEditor
      jot={{
        id: jot.id,
        title: jot.title,
        content: jot.content as MyValue,
        createdAt: jot.createdAt,
        published: jot.published,
      }}
    />
  )
}
