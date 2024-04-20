'use server'

import { signIn, signOut } from "@/auth"

export const signInUser = async (provider, redirectTo: string) => {
  await signIn(provider, { redirectTo })
}

export const signOutUser = async (redirectTo: string) => {
  await signOut({ redirectTo })
}