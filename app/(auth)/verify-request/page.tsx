"use client"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export default function VerifyRequest() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Email Sent
          </h1>
          <p className="text-sm text-muted-foreground pb-3">
            Check your email for a login link
          </p>
          <button
            className={cn(buttonVariants({ variant: "default" }))}
            onClick={() => close()}
          >
            Click here to close this tab
          </button>
        </div>
      </div>
    </div>
  )
}