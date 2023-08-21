import { notFound, redirect } from "next/navigation"
import { JotTemplate, User } from "@prisma/client"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import DocumentEditor from "@/components/document-editor"
import { MyValue } from "@/types/plate-types"

async function getJotTemplate(jotTemplateId: JotTemplate["id"], userId: User["id"]) {
  return await db.jotTemplate.findFirst({
    where: {
      id: jotTemplateId,
      authorId: userId,
    },
  })
}

interface EditorPageProps {
  params: { jotTemplateId: string }
}

export default async function EditorPage({ params }: EditorPageProps) {
  const user = await getCurrentUser()
  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const jot = await getJotTemplate(params.jotTemplateId, user.id)
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
        published: jot.isPublished,
      }}
    />
  )
}
