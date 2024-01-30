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

// TODO
// - createWorkspace
// - updateWorkspace
// - deleteWorkspace