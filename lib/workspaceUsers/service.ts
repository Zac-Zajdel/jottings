'use server'

import * as z from "zod"
import { db } from "@/lib/db"
import { auth } from "@/auth"
import { Workspace } from "@prisma/client"
import { workspaceCache } from "../workspace/cache"

async function validateInviteWorkspaceUser (email: string, workspaceId: string) {
  const addWorkspaceUserSchema = z.object({
    email: z.string().email(),
    workspaceId: z.string(),
  })

  await addWorkspaceUserSchema.parseAsync({email, workspaceId})

  const [user, workspace] = await Promise.all([
    db.user.findUnique({ where: { email } }),
    db.workspace.findUnique({ where: { id: workspaceId } }),
  ])

  if (!user) {
    throw new Error('A user could not be found with this email.')
  }

  if (!workspace) {
    throw new Error('Workspace could not be found.')
  }

  const workspaceUser = await db.workspaceUser.findFirst({
    where: {
      userId: user.id,
      workspaceId: workspace.id,
    }
  })
  
  if (workspaceUser) {
    throw new Error('User is already attached to the workspace.')
  }

  return { user, workspace }
}

export const inviteWorkspaceUser = async (email: string, workspaceId: string) => {
  const session = await auth()
  if (!session) throw new Error('Unauthorized Action.')

  const { user, workspace } = await validateInviteWorkspaceUser(email, workspaceId)

  try {
    const invite = await db.workspaceUser.create({
      data: {
        userId: user.id,
        workspaceId: workspace.id,
        hasAcceptedInvite: false,
      }
    })

    return {
      message: "Invite Sent.",
      data: invite,
    }
  } catch (error) {
    throw error
  }
}

async function acceptInviteWorkspaceUser (workspaceUserId: string, workspaceId: string) {
  const acceptWorkspaceUserSchema = z.object({
    workspaceUserId: z.string(),
    workspaceId: z.string(),
  })

  await acceptWorkspaceUserSchema.parseAsync({workspaceUserId, workspaceId})

  const [workspaceUser, workspace] = await Promise.all([
    db.workspaceUser.findUnique({ where: { id: workspaceUserId, hasAcceptedInvite: false } }),
    db.workspace.findUnique({ where: { id: workspaceId } }),
  ])

  if (!workspaceUser) {
    throw new Error('Invite could not be found')
  }

  if (!workspace) {
    throw new Error('Workspace could not be found.')
  }

  return workspaceUser
}

export const acceptInviteWorkspace = async (workspaceUserId: string, workspaceId: string) => {
  const session = await auth()
  if (!session) throw new Error('Unauthorized Action.')

  const workspaceUser = await acceptInviteWorkspaceUser(workspaceUserId, workspaceId)

  try {
    const updatedWorkspaceUser = await db.workspaceUser.update({
      where: {
        id: workspaceUser.id,
      },
      data: {
        hasAcceptedInvite: true,
      },
    });

    // Refresh workspace sidebar content
    workspaceCache.revalidate({ userId: session.user.id })

    return {
      message: "Invite Accepted.",
      data: updatedWorkspaceUser,
    }
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
