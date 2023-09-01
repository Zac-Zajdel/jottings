"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../plate-ui/dialog"

interface JotTemplateCreateButtonProps extends ButtonProps {}

export function JotTemplateCreateButton({
  className,
  variant,
  ...props
}: JotTemplateCreateButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [title, setTitle] = useState('')

  async function createTemplate() {
    if (title?.trim() === '')
      return toast({
        title: "A Title Is Required",
      })

    setIsLoading(true)
    const response = await fetch("/api/jot_templates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
      }),
    })

    if (!response?.ok) {
      setIsLoading(false)
      return toast({
        title: "Something went wrong.",
        description: "Your Template was not created. Please try again.",
        variant: "destructive",
      })
    }

    const template = await response.json()
    router.refresh()
    router.push(`/templates/${template.id}`)
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
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
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Template</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              className="w-[400px]"
              placeholder="Title"
              value={title}
              onChange={(event) => setTitle(event?.target.value)}
              size={32}
            />
          </div>

          <DialogFooter>
            <Button
              disabled={isLoading}
              onClick={createTemplate}
            >
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.add className="mr-2 h-4 w-4" />
              )}
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
