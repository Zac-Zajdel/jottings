"use client"

import { Label, User } from "@prisma/client"
import { cn, formatDate } from "@/lib/utils"
import { PageBreadcrumbs } from "../page-breadcrumbs"
import { buttonVariants } from "../plate-ui/button"
import { Icons } from "../icons"
import { UserAvatar } from "../user-avatar"
import { MyValue } from "@/types/plate-types"
import { RefObject, useState } from "react"
import { Button } from "../ui/button"
import { PlateEditor } from "@udecode/plate-common"
import { toast } from "../ui/use-toast"
import { useRouter } from "next/navigation"
import { Badge } from "../ui/badge"
import { LabelSelection } from "../label-selection"

interface JotProps {
  jot: {
    id: string
    title: string
    content: MyValue
    status: string
    priority: string | null
    createdAt: Date
    published: boolean
    author: User
    labels: Label[]
  }
  editorRef: RefObject<PlateEditor>
}

export function JotHeader({ jot, editorRef }: JotProps) {
  const router = useRouter()
  const [title, setTitle] = useState(jot.title)
  const [isSaving, setIsSaving] = useState(false)

  async function save() {
    setIsSaving(true)
    const blocks = await editorRef.current?.children

    const response = await fetch(`/api/jots/${jot.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: blocks,
        status: jot.status,
        priority: jot.priority,
      }),
    })

    if (!response?.ok) {
      setIsSaving(false)
      return toast({
        title: "Something went wrong.",
        description: "Your Jot was not saved. Please try again.",
        variant: "destructive",
      })
    }

    router.refresh()
    setIsSaving(false)
    return toast({
      description: "Your Jot has been saved.",
    })
  }

  // todo - call API route that will remove and add.
  // todo - need to create labelAssociations route.ts file for update/delete
  function removeLabel(label: Label) {
    console.log('label: ', label)
  }

  return (
    <div>
      <PageBreadcrumbs
        crumbs={[
          {
            link: "/jots",
            title: "Home",
            icon: "home",
          },
          {
            link: "/jots",
            title: "Jots",
          },
          {
            link: `/jots/${jot.id}`,
            title: title,
            isDynamic: true,
            isCurrentPage: true,
          },
        ]}
      >
        <Button
          className={cn("ml-10", buttonVariants({ variant: "secondary" }))}
          disabled={isSaving}
          onClick={save}
        >
          {isSaving ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.save className="mr-2 h-4 w-4" />
          )}
          <span>Save</span>
        </Button>
      </PageBreadcrumbs>

      <div className="mx-8 pt-6">
        <div>
          <h1
            className="mb-4 max-w-full whitespace-pre-wrap break-words text-4xl font-semibold outline-none"
            contentEditable="true"
            suppressContentEditableWarning={true}
            onInput={(e) =>
              setTitle((e.target as HTMLDivElement).textContent ?? jot.title)
            }
          >
            {jot.title}
          </h1>
        </div>

        <div>
          <div className="w-100 flex pb-2.5">
            <div className="flex h-[34px] w-40 min-w-0 items-center text-sm leading-5">
              <Icons.user className="mr-2 h-4 w-4" />
              <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                Created by:
              </div>
            </div>
            <div className="h-100 flex min-w-0 flex-auto flex-col">
              <div className="h-100 ml-4 flex min-w-0 flex-auto items-center">
                <div className="w-100 relative inline-block min-h-[34px] overflow-hidden rounded-sm p-2 text-sm">
                  <div className="flex h-[20px] min-w-0 flex-shrink-0 flex-wrap items-center">
                    <UserAvatar
                      user={{
                        name: jot.author.name || null,
                        image: jot.author.image || null,
                      }}
                      className="mr-2 h-5 w-5"
                    />
                    <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                      {jot.author.name}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-100 flex pb-2.5">
            <div className="flex h-[34px] w-40 min-w-0 items-center text-sm leading-5">
              <Icons.calendar className="mr-2 h-4 w-4" />
              <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                Last Updated:
              </div>
            </div>
            <div className="h-100 flex min-w-0 flex-auto flex-col">
              <div className="h-100 ml-4 flex min-w-0 flex-auto items-center">
                <div className="w-100 relative inline-block min-h-[34px] overflow-hidden rounded-sm p-2 text-sm">
                  <div className="flex h-[20px] min-w-0 flex-shrink-0 flex-wrap items-center">
                    <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                      {formatDate(jot.createdAt?.toDateString())}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-100 flex mb-5">
            <div className="flex h-[34px] w-40 min-w-0 items-center text-sm leading-5">
              <Icons.tag className="mr-2 h-4 w-4" />
              <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                Labels:
              </div>
            </div>
            <div className="h-100 flex min-w-0 flex-auto flex-col">
              <div className="h-100 ml-4 flex min-w-0 flex-auto items-center">
                <div className="w-100 relative inline-block min-h-[34px] overflow-hidden rounded-sm p-1 text-sm">
                  <div className="flex h-[20px] min-w-0 flex-shrink-0 flex-wrap items-center">
                    <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                      {jot.labels.length ? (
                        <div className="flex items-center">
                          {jot.labels.map((label) => (
                            <span className="pr-2">
                              <Badge
                                color={label.color}
                                removable
                                onRemoved={() => removeLabel(label)}
                              >
                                {label.name}
                              </Badge>
                            </span>
                          ))}
                          <LabelSelection
                            model="jot"
                            modelId={jot.id}
                          />
                        </div>
                      ) : (
                        <div>
                          <LabelSelection
                            model="jot"
                            modelId={jot.id}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
