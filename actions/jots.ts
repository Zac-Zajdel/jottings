'use server'

import { db } from "@/lib/db"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth/next"
import { revalidatePath } from "next/cache"

export async function invalidateJots() {
  revalidatePath('/jots')
}

export async function copyJot(jotId: string) {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error('Unauthorized Action.');
  }

  // Find Jot user has requested to be copied.
  const jot = await db.jot.findUnique({
    where: {
      id: jotId,
      workspaceId: session?.user.activeWorkspaceId,
    },
  })
  if (!jot) {
    throw new Error('Jot was not found. Please refresh and try again.');
  }

  const clone = await db.jot.create({
    data: {
      authorId: session?.user.id,
      workspaceId: session?.user.activeWorkspaceId,
      title: `Copy of ${jot?.title}`,
      content: jot?.content ?? undefined,
      status: jot?.status,
      priority: jot?.priority
    }
  })

  await invalidateJots()

  return {
    message: "Your Jot has been copied.",
    data: { ...clone }
  }
}