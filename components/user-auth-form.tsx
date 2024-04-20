import * as React from "react"

import { cn } from "@/lib/utils"
// import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"

import { signIn } from "../auth"

// import { useSearchParams } from "next/navigation"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import * as z from "zod"
// import { userAuthSchema } from "@/lib/validations/auth"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { toast } from "@/components/ui/use-toast"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

// type FormData = z.infer<typeof userAuthSchema>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<FormData>({
  //   resolver: zodResolver(userAuthSchema),
  // })
  // const [isLoading, setIsLoading] = React.useState<boolean>(false)
  // const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false)
  // const searchParams = useSearchParams()

  // async function onSubmit(data: FormData) {
  //   setIsLoading(true)

  //   const signInResult = await signIn("email", {
  //     email: data.email.toLowerCase(),
  //     redirect: false,
  //     callbackUrl: searchParams?.get("from") || "/dashboard",
  //   })

  //   setIsLoading(false)

  //   if (!signInResult?.ok) {
  //     return toast({
  //       title: "Something went wrong.",
  //       description: "Your sign in request failed. Please try again.",
  //       variant: "destructive",
  //     })
  //   }

  //   return toast({
  //     title: "Check your email",
  //     description: "We sent you a login link. Be sure to check your spam too.",
  //   })
  // }

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
    // <div>
    //   <form
    //     className={cn("grid gap-6", className)} {...props}
    //     action={async () => {
    //       "use server"
    //       await signIn("google", { redirectTo: "/dashboard" })
    //     }}
    //   >
    //     <button
    //       type="submit"
    //       className={cn(buttonVariants({ variant: "default" }))}
    //     >
    //       Google
    //     </button>
    //   </form>
    // </div>
  )
}
