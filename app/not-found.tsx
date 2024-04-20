"use client"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { useRouter } from 'next/navigation';
import { buttonVariants } from "@/components/ui/button"
 
export default function NotFound() {
  const router = useRouter()

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <button
        onClick={router.back}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Go Back To Previous Page
        </>
      </button>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="grid gap-1 text-center">
          <h1 className="font-heading text-3xl md:text-6xl">404</h1>
          <p className="text-muted-foreground">This Page Does Not Exist</p>
        </div>
      </div>
    </div>
  )
}