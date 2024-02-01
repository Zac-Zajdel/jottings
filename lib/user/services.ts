'use server'

import { db } from "@/lib/db"
import { Workspace } from "@prisma/client"
import { workspaceCache } from "../workspace/cache"

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
    // todo - re-validate session.
  } catch (error) {
    throw error;
  }
}
