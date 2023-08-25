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
import { Icon } from '@radix-ui/react-select';
import { UserAvatar } from '../user-avatar';

interface JotProps {
  jot: {
    id: string
    title: string
    content: MyValue
    status: string
    priority: string | null
    createdAt: Date
    published: boolean
  },
}

export default function JotDetails({ jot }: JotProps) {
  const router = useRouter()
  const editorRef = useRef<PlateEditor>(null);
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
        title: jot.title,
        content: blocks,
        status: jot.status,
        priority: jot.priority,
      }),
    })

    setIsSaving(false)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your Jot was not saved. Please try again.",
        variant: "destructive",
      })
    }

    router.refresh()
    return toast({
      description: "Your Jot has been saved.",
    })
  }

  return (
    <div>
      <div className="flex w-full mb-4 text-4xl font-bold">
        { jot.title }
      </div>
  
      {/* Cleanup */}
      <div className="m-0">
        <div className="flex flex-col">
          <div className="flex w-100 pb-3">
            <div className="flex items-center h-[34px] w-[160px]">
              <div className="flex h-full w-full">
                <div className="flex items-center leading-5 min-w-0 text-sm">
                  <Icons.user className="mr-2 h-4 w-4" />
                  <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                    Created by
                  </div>
                </div>
              </div>
            </div>
            <div className="flex ml-4 h-100 flex-auto flex-col min-w-0">
              <div className="flex items-center ml-4 h-100 flex-auto min-w-0">
                <div className="relative text-sm overflow-hidden inline-block rounded-sm w-100 py-[7px] px-[8px] min-h-[34px]">
                  <div className="flex flex-wrap gap-2">
                    <div
                      className="flex items-center flex-shrink-0 min-w-0 h-[20px]"
                    >
                      <div
                        className="flex items-center min-w-0"
                      >
                        <div className="mr-2">
                          <UserAvatar
                            user={{ name:'Zajdel ' || null, image: "https://lh3.googleusercontent.com/a/AAcHTteNPJzFtVqq3NdvRk7Le2777-8wVcfVvAB5IFsnz9kZXrs=s96-c" || null }}
                            className="h-5 w-5"
                          />
                        </div>
                        <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                          Zac Zajdel
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-100 pb-3">
            <div className="flex items-center h-[34px] w-[160px]">
              <div className="flex h-full w-full">
                <div className="flex items-center leading-5 min-w-0 text-sm">
                  <Icons.user className="mr-2 h-4 w-4" />
                  <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                    Last Updated
                  </div>
                </div>
              </div>
            </div>
            <div className="flex ml-4 h-100 flex-auto flex-col min-w-0">
              <div className="flex items-center ml-4 h-100 flex-auto min-w-0">
                <div className="relative text-sm overflow-hidden inline-block rounded-sm w-100 py-[7px] px-[8px] min-h-[34px]">
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center flex-shrink-0 min-w-0 h-[20px]">
                      <div className="flex items-center min-w-0">
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
      </div>

      <div className="flex w-full items-center justify-between mb-2">
        <span className="flex space-x-10">
          <Link
            href="/jots"
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
          id: jot.id,
          title: jot.title,
          content: jot.content as MyValue,
          createdAt: jot.createdAt,
        }}
      />
    </div>
  );
}
