'use server'

import { db } from "@/lib/db"
import { auth } from "@/auth"
import { Workspace } from "@prisma/client"

export const createWorkspaceUser = async () => {
  const session = await auth()
  if (!session) throw new Error('Unauthorized Action.')

  try {
    // todo
  } catch (error) {
    throw error
  }
}

export const deleteWorkspaceUser = async (workspaceUserPrimaryKey: string, workspace: Workspace) => {
  const session = await auth()
  if (!session) throw new Error('Unauthorized Action.')

  const workspaceUser = await db.workspaceUser.findUnique({
    where: {
      id: workspaceUserPrimaryKey,
    }
  });

  if (!workspaceUser)
    throw new Error('Workspace user was not found.')

  if (workspaceUser.userId === workspace.ownerId)
    throw new Error('Owners of a workspace cannot be removed.')

  // If they have only been invited, we have much less cleanup to do.
  if (!workspaceUser.hasAcceptedInvite) {
    try {
      await db.workspaceUser.delete({
        where: {
          id: workspaceUser.id,
        },
      })

      return {
        message: "Invited user has been removed.",
      }
    } catch (error) {
      throw error
    }
  }
  
  try {
    await db.$transaction(async (tx) => {
      await tx.workspaceUser.delete({
        where: {
          id: workspaceUser.id,
        },
      })

      await tx.jot.updateMany({
        where: {
          authorId: workspaceUser.userId,
        },
        data: {
          authorId: session.user.id,
        },
      })

      await tx.jotTemplate.updateMany({
        where: {
          authorId: workspaceUser.userId,
        },
        data: {
          authorId: session.user.id,
        },
      })

      await tx.label.updateMany({
        where: {
          authorId: workspaceUser.userId,
        },
        data: {
          authorId: session.user.id,
        },
      })

      await tx.labelAssociation.updateMany({
        where: {
          authorId: workspaceUser.userId,
        },
        data: {
          authorId: session.user.id,
        },
      })
    })

    return {
      message: "User has been removed from the workspace.",
    }
  } catch (error) {
    throw error
  }
}
