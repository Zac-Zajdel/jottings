'use server'

import { db } from "@/lib/db"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth/next"
import { revalidateTag } from "next/cache"

export async function invalidateTemplates() {
  revalidateTag('templates')
}

export async function copyJotTemplates(jotTemplateId: string) {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error('Unauthorized Action.');
  }

  // Find Jot user has requested to be copied.
  const jot = await db.jotTemplate.findUnique({
    where: {
      id: jotTemplateId,
      workspaceId: session?.user.activeWorkspaceId,
    },
  })
  if (!jot) {
    throw new Error('Template was not found. Please refresh and try again.');
  }

  const clone = await db.jotTemplate.create({
    data: {
      authorId: session?.user.id,
      workspaceId: session?.user.activeWorkspaceId,
      title: `Copy of ${jot?.title}`,
      content: jot?.content ?? undefined,
    }
  })

  await invalidateTemplates()

  return {
    message: "Your template has been copied.",
    data: { ...clone }
  }
}