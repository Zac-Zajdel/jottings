"use client"

import { User } from "@prisma/client"
import { cn, formatDate } from "@/lib/utils"
import { PageBreadcrumbs } from "../page-breadcrumbs"
import { buttonVariants } from "../plate-ui/button"
import { Icons } from "../icons"
import { UserAvatar } from "../user-avatar"
import { MyValue } from "@/types/plate-types"
import { RefObject, useState } from "react"
import { Button } from "../ui/button"
import { PlateEditor } from '@udecode/plate-common';
import { toast } from "../ui/use-toast"
import { useRouter } from "next/navigation"

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
  },
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

  return (
    <div>
      <PageBreadcrumbs crumbs={[
          {
            link: '/jots',
            title: 'Home',
            icon: 'home',
          },
          {
            link: '/jots',
            title: 'Jots',
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
          className={cn('ml-10', buttonVariants({ variant: "secondary" }))}
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

      <div className="pt-6 mx-8">
        <div>
          <h1
            className="max-w-full whitespace-pre-wrap break-words mb-4 text-4xl font-semibold outline-none"
            contentEditable="true"
            suppressContentEditableWarning={true}
            onInput={(e) => setTitle((e.target as HTMLDivElement).textContent ?? jot.title)}
          >
            { jot.title }
          </h1>
        </div>
    
        <div>
          <div className="flex w-100 pb-3">
            <div className="flex items-center h-[34px] w-40 leading-5 min-w-0 text-sm">
              <Icons.user className="mr-2 h-4 w-4" />
              <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                Created by:
              </div>
            </div>
            <div className="flex h-100 flex-auto flex-col min-w-0">
              <div className="flex items-center ml-4 h-100 flex-auto min-w-0">
                <div className="relative text-sm overflow-hidden inline-block rounded-sm w-100 py-[7px] px-[8px] min-h-[34px]">
                  <div className="flex flex-wrap items-center flex-shrink-0 min-w-0 h-[20px]">
                    <UserAvatar
                      user={{ name: jot.author.name || null, image: jot.author.image || null }}
                      className="h-5 w-5 mr-2"
                    />
                    <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                      { jot.author.name }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-100 pb-3">
            <div className="flex items-center h-[34px] w-40 leading-5 min-w-0 text-sm">
              <Icons.calendar className="mr-2 h-4 w-4" />
              <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                Last Updated:
              </div>
            </div>
            <div className="flex h-100 flex-auto flex-col min-w-0">
              <div className="flex items-center ml-4 h-100 flex-auto min-w-0">
                <div className="relative text-sm overflow-hidden inline-block rounded-sm w-100 py-[7px] px-[8px] min-h-[34px]">
                  <div className="flex flex-wrap items-center flex-shrink-0 min-w-0 h-[20px]">
                    <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                      {formatDate(jot.createdAt?.toDateString())}
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
