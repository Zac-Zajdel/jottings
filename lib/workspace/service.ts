'use server'

import { db } from "@/lib/db"
import { unstable_cache } from "next/cache";
import { Workspace } from "@prisma/client";
import { workspaceCache } from "./cache";

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
  return db.$transaction(async (tx) => {
    // 1. Create new workspace
    const workspace = await tx.workspace.create({
      data: {
        name: name,
        ownerId: userId,
      },
      select: {
        id: true,
      }
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
}

/**
 * @desc - Updates the active workspace of a user
 */
export const updateActiveWorkspace = async (workspace: Workspace, userId: string) => {
  try {
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        activeWorkspaceId: workspace.id,
      }
    })

    workspaceCache.revalidate({userId})
  } catch (error) {
    throw error;
  }
}