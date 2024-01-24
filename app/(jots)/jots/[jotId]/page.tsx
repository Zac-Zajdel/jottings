import { notFound, redirect } from "next/navigation"
import { Jot } from "@prisma/client"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { MyValue } from "@/types/plate-types"
import JotDetails from "@/components/jots/jot-details"

async function getJotForUser(jotId: Jot["id"], activeWorkspaceId: string) {
  return await db.jot.findFirst({
    where: {
      id: jotId,
      workspaceId: activeWorkspaceId,
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
  params: { jotId: string }
}

export default async function EditorPage({ params }: EditorPageProps) {
  const user = await getCurrentUser()
  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const jot = await getJotForUser(params.jotId, user.activeWorkspaceId)
  if (!jot) {
    notFound()
  }

  return (
    <div>
      <JotDetails
        jot={{
          id: jot.id,
          title: jot.title,
          content: jot.content as MyValue,
          status: jot.status,
          priority: jot.priority,
          createdAt: jot.createdAt,
          published: jot.published,
          author: jot.author,
          labelAssociations: jot.labels,
        }}
      />
    </div>
  )
}
