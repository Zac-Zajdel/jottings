"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

interface JotTemplateCreateButtonProps extends ButtonProps {}

export function JotTemplateCreateButton({
  className,
  variant,
  ...props
}: JotTemplateCreateButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  async function onClick() {
    setIsLoading(true)

    const response = await fetch("/api/jot_templates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Untitled Template",
      }),
    })

    setIsLoading(false)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your template was not created. Please try again.",
        variant: "destructive",
      })
    }

    const template = await response.json()

    // This forces a cache invalidation.
    router.refresh()

    router.push(`/templates/${template.id}`)
  }

  return (
    <Button
      onClick={onClick}
      className={cn(
        buttonVariants({ variant }),
        {
          "cursor-not-allowed opacity-60": isLoading,
        },
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.add className="mr-2 h-4 w-4" />
      )}
      New Template
    </Button>
  )
}
