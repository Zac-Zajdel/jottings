"use client"

import { useEffect, useState } from "react"
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
import { JotTemplate } from "@prisma/client"
import { useDebounce } from "@uidotdev/usehooks";

interface JotCreateButtonProps extends ButtonProps {}

export function JotCreateButton({
  className,
  variant,
  ...props
}: JotCreateButtonProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Form Data
  const [title, setTitle] = useState("Untitled...")
  const [templateId, setTemplateId] = useState("")

  // <Input /> component title filtering
  const [searchTitle, setSearchTitle] = useState("")
  const debouncedSearchTerm = useDebounce(searchTitle, 500);
  const [templates, setTemplates] = useState<JotTemplate[]>([])

  // When dropdown is opened or if search term is changed, query for templates
  useEffect(() => {
    const fetchTemplates = async () => {
      const response = await fetch("/api/jot_templates?" + new URLSearchParams({
        search: searchTitle
      }))
      const data = await response.json()
      setTemplates(data)
    }

    if (open) {
      fetchTemplates();
    }
  }, [open, debouncedSearchTerm]);

  async function createJot() {
    setIsLoading(true)

    const response = await fetch("/api/jots", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        templateId: templateId ?? null,
      }),
    })

    setIsLoading(false)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your jot was not created. Please try again.",
        variant: "destructive",
      })
    }

    const jot = await response.json()

    router.refresh()
    router.push(`/jots/${jot.id}`)
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
            New jot
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Jot</DialogTitle>
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

            <div>
              <div className="relative mt-2">
                <Label>Template</Label>
                <Button
                  variant="outline"
                  role="combobox"
                  onClick={() => setOpen(!open)}
                  className="mt-2 w-[400px] justify-between"
                >
                  {templateId
                    ? templates.find((template) => template.id === templateId)
                        ?.title
                    : "Select Template..."}
                  <Icons.chevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>

                {open && (
                  <ul className="absolute z-10 mt-1 max-h-56 w-[400px] overflow-auto rounded-md border bg-background py-1 text-sm font-medium ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Input
                      className="w-[400px focus-visible:ring-0 rounded-none border-t-0 border-x-0 mb-1"
                      placeholder="Search for templates..."
                      value={searchTitle}
                      onChange={(event) => setSearchTitle(event?.target.value)}
                      size={32}
                    />
                    {templates.length ? (
                      templates.map((template) => (
                        <li
                          className="relative cursor-pointer select-none rounded-md py-2 mx-1 pr-9 hover:bg-accent"
                          key={template.id}
                          onClick={() => {
                            setTemplateId(template.id)
                            setOpen(false)
                          }}
                        >
                          <div className="flex items-center">
                            <span className="ml-3 block truncate font-normal">
                              {template.title}
                            </span>
                          </div>
                          {template.id === templateId ? (
                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-sm">
                              <Icons.check className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </span>
                          ) : null}
                        </li>
                      ))
                    ) : (
                      <li className="relative rounded-md py-2 pr-9">
                        <div className="flex items-center">
                          <span className="ml-3 block truncate font-normal">
                            No Templates Found...
                          </span>
                        </div>
                      </li>
                    )}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={createJot}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
