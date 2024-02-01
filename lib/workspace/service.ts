'use server'

import { db } from "@/lib/db"
import { unstable_cache } from "next/cache";
import { Workspace } from "@prisma/client";
import { workspaceCache } from "./cache";

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

export const createWorkspace = async (userId: string) => {
  // todo - validate unique name
  // todo transaction
  
  const workspace = await db.workspace.create({
    data: {
      name: 'Hello World',
      ownerId: userId,
    },
    select: {
      id: true,
    }
  })

  await db.workspaceUser.create({
    data: {
      userId: userId,
      workspaceId: workspace.id,
    }
  })

  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      activeWorkspaceId: workspace.id,
    }
  })

  workspaceCache.revalidate({userId})
}