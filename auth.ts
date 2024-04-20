import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"

import type { NextAuthConfig } from "next-auth"

export const config = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [Google],
  session: { strategy: "jwt" },
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.activeWorkspaceId = token.activeWorkspaceId as string
        session.user.name = token.name
        session.user.email = token.email as string
        session.user.image = token.picture
      }

      return session
    },

    async jwt({ token, session, trigger }) {
      // Called from components/workspace-nav.tsx
      if (trigger === 'update' && session?.activeWorkspaceId) {
        token.activeWorkspaceId = session.activeWorkspaceId
      }
  
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
            name: 'Private Workspace',
            ownerId: dbUser.id,
            default: true,
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
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)