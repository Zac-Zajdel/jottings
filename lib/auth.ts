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

    // TODO - Fix types....
    async jwt({ token, user }) {
      if (token?.id) {
        console.log('TOKEN ANYWAYS', token)
        return {
          id: token.id,
          activeWorkspaceId: token.activeWorkspaceId,
          name: token.name,
          email: token.email,
          picture: token.picture,
        }
      }

      /**
       * 1. If we force non-automatic sign-in we can know we hit this
       * 2. If workspace is not found, then do the work needed.
       * 3. Worse case scenario force this after the creation.
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

      if (!dbUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      }

      // todo - added last second
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