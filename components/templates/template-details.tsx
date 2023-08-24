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

interface TemplateProps {
  jotTemplate: {
    id: string
    title: string
    content: MyValue
    createdAt: Date
  },
}

export default function TemplateDetails({ jotTemplate }: TemplateProps) {
  const router = useRouter()
  const editorRef = useRef<PlateEditor>(null);
  const [isSaving, setIsSaving] = useState(false)

  async function save() {
    setIsSaving(true)

    const blocks = await editorRef.current?.children
    const response = await fetch(`/api/jot_templates/${jotTemplate.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: jotTemplate.title,
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
      <div className="flex w-full justify-center items-center mb-2">
        { jotTemplate.title }
      </div>
      <div className="flex w-full justify-center items-center text-sm text-muted-foreground">
        {formatDate(jotTemplate.createdAt?.toDateString())}
      </div>

      <div className="flex w-full items-center justify-between mb-2">
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
