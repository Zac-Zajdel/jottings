"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { signInUser } from "@/lib/auth/actions"
import { buttonVariants } from "@/components/ui/button"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className }: UserAuthFormProps) {
  return (
    <div className={cn("grid gap-6", className)}>
      <button
        className={cn(buttonVariants({ variant: "default" }))}
        onClick={async () => {
          await signInUser('google', '/jots')
        }}
      >
        Sign in with Google
      </button>
    </div>
  )
}
