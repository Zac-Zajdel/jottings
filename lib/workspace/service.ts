'use server'

import { db } from "@/lib/db"
import { workspaceCache } from "./cache";
import { Workspace } from "@prisma/client";
import { unstable_cache } from "next/cache";

/**
 * @desc - Obtain workspaces within the sidebar
 */
export const getWorkspacesByUserId = async (userId: string): Promise<Workspace[] | null> => {
  const workspaces = await unstable_cache(
    async () => {
      try {
        const workspacesForUser = await db.workspace.findMany({
          where: {
            workspaceUsers: {
              some: {
                userId: userId,
              }
            }
          },
          orderBy: {
            name: 'asc',
          }
        });
  
        return workspacesForUser
      } catch (error) {
        throw error;
      }
    },
    [`getWorkspacesByUserId-${userId}`],
    {
      tags: [workspaceCache.tag.byUserId(userId)],
    }
  )();

  return workspaces ?? null;
};

/**
 * @desc - Generates a new workspace and updates active workspace
 */
export const createWorkspace = async (name: string, userId: string) => {
  try {
    const workspace = await db.$transaction(async (tx) => {
      // 1. Create new workspace
      const workspace = await tx.workspace.create({
        data: {
          name: name,
          ownerId: userId,
        },
      })
    
      // 2. Associate user to workspace
      await tx.workspaceUser.create({
        data: {
          userId: userId,
          workspaceId: workspace.id,
        }
      })
    
      // 3. New workspace has become the active one
      await tx.user.update({
        where: {
          id: userId,
        },
        data: {
          activeWorkspaceId: workspace.id,
        }
      })
    
      workspaceCache.revalidate({userId})
    
      return workspace
    })

    return {
      message: `Workspace ${workspace.name} created successfully`,
      data: { ...workspace }
    }
  } catch (error) {
    throw error
  }
}

/**
 * @desc - Updates the active workspace of a user
 */
export const updateActiveWorkspace = async (workspace: Workspace, userId: string) => {
  try {
    const updatedUser = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        activeWorkspaceId: workspace.id,
      }
    })

    workspaceCache.revalidate({userId})

    return {
      message: `Active workspace updated successfully`,
      data: { ...updatedUser }
    }
  } catch (error) {
    throw error;
  }
}

/**
 * @desc - Delete current workspace and go back to default
 */
export const deleteWorkspace = async (workspaceId: string, userId: string) => {
  const workspace = await db.workspace.findFirst({
    where: {
      id: workspaceId,
      ownerId: userId,
    },
  });

  const defaultWorkspace = await db.workspace.findFirst({
    where: {
      ownerId: userId,
      default: true,
    }
  })

  if (!workspace || !defaultWorkspace)
    throw new Error('Cannot find workspace for deletion.')

  if (workspace.default)
    throw new Error('Default workspaces are not applicable for removal.')

  try {
    await db.$transaction(async (tx) => {
      await tx.user.update({
        where: {
          id: userId
        },
        data: {
          activeWorkspaceId: defaultWorkspace.id,
        }
      })

      await tx.jotTemplate.deleteMany({
        where: {
          workspaceId: workspace.id,
        }
      })

      await tx.jot.deleteMany({
        where: {
          workspaceId: workspace.id,
        }
      })

      await tx.label.deleteMany({
        where: {
          workspaceId: workspace.id,
        }
      })

      await tx.workspaceUser.deleteMany({
        where: {
          workspaceId: workspace.id,
        }
      })

      await tx.workspace.delete({
        where: {
          id: workspace.id,
          ownerId: userId,
        }
      })
  
      workspaceCache.revalidate({userId: userId})
    })

    return {
      message: `Workspace ${workspace.name} deleted successfully`,
      data: {
        workspace: defaultWorkspace,
      }
    }
  } catch (error) {
    throw error
  }
}