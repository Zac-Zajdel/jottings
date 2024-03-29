'use server'

import { db } from "@/lib/db"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth/next"

export async function copyJotTemplates(jotTemplateId: string) {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error('Unauthorized Action.');
  }

  // Find Jot user has requested to be copied.
  const jot = await db.jotTemplate.findUnique({
    where: {
      id: jotTemplateId,
      authorId: session?.user.id,
    },
  })
  if (!jot) {
    throw new Error('Template was not found. Please refresh and try again.');
  }

  const clone = await db.jotTemplate.create({
    data: {
      authorId: session?.user.id,
      title: `Copy of ${jot?.title}`,
      content: jot?.content ?? undefined,
    }
  })

  return {
    message: "Your template has been copied.",
    data: { ...clone }
  }
}