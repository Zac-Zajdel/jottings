'use server'

import { db } from "@/lib/db"
import { auth } from "@/auth"

export const createWorkspaceUser = async () => {
  const session = await auth()
  if (!session) throw new Error('Unauthorized Action.')

  try {
    // todo
  } catch (error) {
    throw error
  }
}

export const deleteWorkspaceUser = async (workspaceUserId: string, userId: string) => {
  const session = await auth()
  if (!session) throw new Error('Unauthorized Action.')

  try {
    await db.$transaction(async (tx) => {
      await tx.workspaceUser.delete({
        where: {
          id: workspaceUserId,
        },
      })

      await tx.jot.updateMany({
        where: {
          authorId: userId,
        },
        data: {
          authorId: session.user.id,
        },
      })

      await tx.jotTemplate.updateMany({
        where: {
          authorId: userId,
        },
        data: {
          authorId: session.user.id,
        },
      })

      await tx.label.updateMany({
        where: {
          authorId: userId,
        },
        data: {
          authorId: session.user.id,
        },
      })

      await tx.labelAssociation.updateMany({
        where: {
          authorId: userId,
        },
        data: {
          authorId: session.user.id,
        },
      })
    })

    return {
      message: "Member has been removed from the workspace.",
    }
  } catch (error) {
    throw error
  }
}
