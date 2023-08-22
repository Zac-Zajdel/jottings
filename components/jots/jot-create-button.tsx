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

interface JotCreateButtonProps extends ButtonProps {}

export function JotCreateButton({
  className,
  variant,
  ...props
}: JotCreateButtonProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [title, setTitle] = useState('Untitled')
  const [templateId, setTemplateId] = useState('')
  const [templates, setTemplates] = useState<JotTemplate[]>([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      const response = await fetch("/api/jot_templates");
      const data = await response.json();
      setTemplates(data);
    };

    fetchTemplates();
  }, []);

  async function onClick() {
    setIsLoading(true)

    const response = await fetch("/api/jots", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        templateId: templateId ?? null
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
            <Label htmlFor="title">
              Title
            </Label>
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
                <Label>
                  Template
                </Label>
                <Button
                  variant="outline"
                  role="combobox"
                  onClick={() => setOpen(!open)}
                  className="w-[400px] justify-between mt-2"
                >
                  {templateId
                    ? templates.find((template) => template.id === templateId)?.title
                    : "Select Template..."}
                  <Icons.chevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>

                {open && (
                  <ul className="absolute z-10 mt-1 max-h-56 w-[400px] overflow-auto rounded-md bg-background py-1 ring-1 ring-black ring-opacity-5 focus:outline-none font-medium text-sm border">
                    {templates.map((template) => (
                      <li
                        className="relative cursor-pointer select-none py-2 pr-9 hover:bg-accent rounded-md"
                        key={template.id}
                        onClick={() => {
                          setTemplateId(template.id)
                          setOpen(false)
                        }}
                      >
                        <div className="flex items-center">
                          <span className="font-normal ml-3 block truncate">{template.title}</span>
                        </div>
                        {template.id === templateId ? (
                          <span className="absolute inset-y-0 right-0 flex text-sm items-center pr-4">
                            <Icons.check className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </span>
                        ) : null
                        }
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={onClick}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
