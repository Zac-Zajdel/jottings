import * as React from "react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { signIn } from "@/auth"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className }: UserAuthFormProps) {
  return (
    <form
      className={cn("grid gap-6", className)}
      action={async () => {
        "use server"
        await signIn("google", { redirectTo: "/jots" })
      }}
    >
      <button
        type="submit"
        className={cn(buttonVariants({ variant: "default" }))}
      >
        Sign in
      </button>
    </form>
  )
}
