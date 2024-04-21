'use server'

import { signIn, signOut } from "@/auth"

type provider = 'google'|'resend'

export const signInUser = async (
  provider: provider,
  redirectTo: string,
  formData = {}
) => {
  await signIn(provider, {...formData, redirectTo })
}

export const signOutUser = async (redirectTo: string) => {
  await signOut({ redirectTo })
}