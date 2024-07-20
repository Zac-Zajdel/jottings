"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export default function AuthErrorPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            The link you used is no longer valid
          </h1>
          <p className="text-sm text-muted-foreground pb-3">
            It may have been used already or it may have expired
          </p>
          <Link
            href="/signin"
            className={cn(
              buttonVariants({ variant: "default" }),
            )}
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}