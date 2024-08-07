import { db } from "@/lib/db"
import NextAuth from "next-auth"
import { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import Resend from "next-auth/providers/resend"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { magicLinkVerificationRequest } from './lib/resend/magicLinkVerificationRequest'

export const config: NextAuthConfig = {
  adapter: PrismaAdapter(db),
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Resend({
      from: 'Jottings <login@jottings.dev>',
      sendVerificationRequest({
        identifier: email,
        url,
        provider: { server, from },
      }) {
        magicLinkVerificationRequest({
          to: email,
          url,
          server,
          from,
        })
      },
    }),
  ],
  pages: {
    verifyRequest: "/verify-request",
    error: "/error",
  },
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
      // Called when updating the tokens information
      if (trigger === 'update') {
        if (session?.activeWorkspaceId)
          token.activeWorkspaceId = session.activeWorkspaceId

        if (session?.name)
          token.name = session.name
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
            hasAcceptedInvite: true,
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

export const { handlers, auth, signIn, signOut } = NextAuth(config)