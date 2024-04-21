"use client"

import * as z from "zod"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useForm } from "react-hook-form"
import { Icons } from "@/components/icons"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signInUser } from "@/lib/auth/actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { userAuthSchema } from "@/lib/validations/auth"
import { buttonVariants } from "@/components/ui/button"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>

export function UserAuthForm({ className }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  })
  const [isEmailLoading, setIsEmailLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  async function onSubmit(formData: FormData) {
    setIsEmailLoading(true)
    await signInUser('resend', '/jots', formData)
    setIsEmailLoading(false)
  }

  return (
    <div className={cn("grid gap-6", className)}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isEmailLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <button
            className={cn(buttonVariants(), 'mt-2')}
            disabled={isEmailLoading}
          >
            {isEmailLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </button>
        </div>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <button
        className={cn(buttonVariants({ variant: "default" }))}
        onClick={async () => {
          setIsGoogleLoading(true)
          await signInUser('google', '/jots')
          setIsGoogleLoading(true)
        }}
      >
        {isGoogleLoading && (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        )}
        Google
      </button>
    </div>
  )
}
