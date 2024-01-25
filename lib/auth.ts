import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import GoogleProvider from 'next-auth/providers/google'
import { env } from "@/env.mjs"
import { db } from "@/lib/db"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db as any),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.activeWorkspaceId = token.activeWorkspaceId as string
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }

      return session
    },

    async jwt({ token }) {
      if (token?.id) {
        return {
          id: token.id,
          activeWorkspaceId: token.activeWorkspaceId,
          name: token.name,
          email: token.email,
          picture: token.picture,
        }
      }

      /**
       * 1. Create user
       * 2. Create workspace
       * 3. Associate to workspace
       * 4. Return a default created token
       */
      let dbUser = await db.user.upsert({
        where: {
          email: token.email as string,
        },
        update: {},
        create: {
          id: token.id,
          email: token.email,
          name: token.name,
          image: token.picture,
        },
      })

      // Create default workspace and associate to user.
      if (!dbUser.activeWorkspaceId) {
        const workspace = await db.workspace.create({
          data: {
            name: 'Default',
            ownerId: dbUser.id,
          }
        })

        dbUser = await db.user.update({
          where: { id: dbUser.id },
          data: {
            activeWorkspaceId: workspace.id,
          }
        })

        await db.workspaceUser.create({
          data: {
            userId: dbUser.id,
            workspaceId: workspace.id,
          }
        })
      }

      return {
        id: dbUser.id,
        activeWorkspaceId: dbUser.activeWorkspaceId,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      }
    },
  },
}