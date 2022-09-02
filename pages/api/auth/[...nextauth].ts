import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { prisma } from '../../../lib/prisma'

// todo - Cleanup export if everything else works
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async session({ session, user }) {
      session.user = user
      return session
    },
  },
}

export default NextAuth(authOptions)
