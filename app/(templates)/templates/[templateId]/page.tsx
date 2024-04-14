import { notFound, redirect } from "next/navigation"
import { JotTemplate, User } from "@prisma/client"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { MyValue } from "@/types/plate-types"
import TemplateDetails from "@/components/templates/template-details"

async function getJotTemplate(templateId: JotTemplate["id"], userId: User["id"]) {
  return await db.jotTemplate.findFirst({
    where: {
      id: templateId,
      authorId: userId,
    },
    include: {
      author: true,
      labels: {
        include: {
          label: true,
        }
      }
    }
  })
}

interface EditorPageProps {
  params: { templateId: string }
}

export default async function EditorPage({ params }: EditorPageProps) {
  const user = await getCurrentUser()
  if (!user) {
    redirect(authOptions?.pages?.signIn || "/signin")
  }

  const template = await getJotTemplate(params.templateId, user.id)
  if (!template) {
    notFound()
  }

  return (
    <TemplateDetails
      jotTemplate={{
        id: template.id,
        title: template.title,
        content: template.content as MyValue,
        createdAt: template.createdAt,
        author: template.author,
        labelAssociations: template.labels,
      }}
    />
  )
}
