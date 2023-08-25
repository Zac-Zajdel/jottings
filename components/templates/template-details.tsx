'use client';

import React, { useRef, useState } from 'react';
import { PlateEditor } from '@udecode/plate-common';
import { formatDate } from "@/lib/utils"
import { cn } from '@/lib/utils';
import { buttonVariants } from "@/components/ui/button"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from "@/components/ui/use-toast"
import { MyValue } from '@/types/plate-types';
import { Icons } from '../icons';
import DocumentEditor from '../document-editor';
import { UserAvatar } from '../user-avatar';
import { User } from '@prisma/client';

interface TemplateProps {
  jotTemplate: {
    id: string
    title: string
    content: MyValue
    createdAt: Date
    author: User
  },
}

export default function TemplateDetails({ jotTemplate }: TemplateProps) {
  const router = useRouter()
  const editorRef = useRef<PlateEditor>(null);
  const [isSaving, setIsSaving] = useState(false)
  const [title, setTitle] = useState(jotTemplate.title)

  async function save() {
    setIsSaving(true)

    const blocks = await editorRef.current?.children
    const response = await fetch(`/api/jot_templates/${jotTemplate.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: blocks,
      }),
    })

    setIsSaving(false)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your Template was not saved. Please try again.",
        variant: "destructive",
      })
    }

    router.refresh()
    return toast({
      description: "Your Template has been saved.",
    })
  }

  return (
    <div>
      <div className="pl-2.5">
        <h1
          className="max-w-full whitespace-pre-wrap break-words mb-4 text-4xl font-semibold outline-none"
          contentEditable="true"
          onInput={(e) => setTitle((e.target as HTMLDivElement).textContent ?? jotTemplate.title)}
        >
          { jotTemplate.title }
        </h1>
      </div>

      <div className="pl-2.5">
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
                    user={{ name: jotTemplate.author.name || null, image: jotTemplate.author.image || null }}
                    className="h-5 w-5 mr-2"
                  />
                  <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                    { jotTemplate.author.name }
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
                    {formatDate(jotTemplate.createdAt?.toDateString())}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center justify-between mb-2 pt-2">
        <span className="flex space-x-10">
          <Link
            href="/templates"
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            <>
              <Icons.chevronLeft className="mr-2 h-4 w-4" />
              Back
            </>
          </Link>
        </span>
        <button
          className={cn(buttonVariants({ variant: "ghost" }))}
          onClick={save}
        >
          {isSaving && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          <span>Save</span>
        </button>
      </div>

      <DocumentEditor
        editorRef={editorRef}
        content={{
          id: jotTemplate.id,
          title: jotTemplate.title,
          content: jotTemplate.content as MyValue,
          createdAt: jotTemplate.createdAt,
        }}
      />
    </div>
  );
}
