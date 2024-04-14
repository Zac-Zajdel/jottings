import { revalidateTag } from "next/cache";

interface RevalidateProps {
  userId?: string;
}

export const workspaceCache = {
  tag: {
    byUserId(userId: string) {
      return `workspaces-${userId}`;
    },
  },
  revalidate({ userId }: RevalidateProps): void {
    if (userId) {
      revalidateTag(this.tag.byUserId(userId));
    }
  },
};