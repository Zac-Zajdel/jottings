'use client';

import React, { useRef, useState } from 'react';
import { CommentsProvider } from '@udecode/plate-comments';
import { Plate, PlateProvider } from '@udecode/plate-common';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { commentsUsers, myUserId } from '@/lib/plate/comments';
import { MENTIONABLES } from '@/lib/plate/mentionables';
import { plugins } from '@/lib/plate/plate-plugins';
import { cn } from '@/lib/utils';
import { buttonVariants } from "@/components/ui/button"
import { CommentsPopover } from '@/components/plate-ui/comments-popover';
import { CursorOverlay } from '@/components/plate-ui/cursor-overlay';
import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar';
import { FixedToolbarButtons } from '@/components/plate-ui/fixed-toolbar-buttons';
import { FloatingToolbar } from '@/components/plate-ui/floating-toolbar';
import { FloatingToolbarButtons } from '@/components/plate-ui/floating-toolbar-buttons';
import { MentionCombobox } from '@/components/plate-ui/mention-combobox';
import Link from 'next/link';
import { Icons } from './icons';
import { useRouter } from 'next/navigation';
import { toast } from "@/components/ui/use-toast"

export default function Editor() {
  const router = useRouter()
  // const ref = React.useRef<EditorJS>()
  const containerRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false)

  const initialValue = [
    {
      type: ELEMENT_PARAGRAPH,
      children: [{ text: 'Hello, World!' }],
    },
  ];

  async function onSubmit(e) {
    setIsSaving(true)
    e.preventDefault()

    console.log('containerref', containerRef)

    // const blocks = await ref.current?.save()

    // const response = await fetch(`/api/posts/${1}`, {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     title: data.title,
    //     content: blocks,
    //   }),
    // })

    setIsSaving(false)

    // if (!response?.ok) {
    //   return toast({
    //     title: "Something went wrong.",
    //     description: "Your post was not saved. Please try again.",
    //     variant: "destructive",
    //   })
    // }

    // router.refresh()
    return toast({
      description: "Your post has been saved.",
    })
  }

  return (
    <div>
      <div className="flex w-full items-center justify-between mb-2">
        <span className="flex space-x-10">
          <Link
            href="/dashboard"
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            <>
              <Icons.chevronLeft className="mr-2 h-4 w-4" />
              Back
            </>
          </Link>
        </span>
        <button
          type="submit"
          onClick={onSubmit}
        >
          {isSaving && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          <span>Save</span>
        </button>
      </div>

      <div className="border border-gray-400 border-opacity-20">
        <div className="grid w-full gap-5">
          <FixedToolbar>
            <FixedToolbarButtons />
          </FixedToolbar>

          <PlateProvider
            plugins={plugins}
            initialValue={initialValue}
          >
            <div className="flex overflow-y-hidden max-h-[80vh]">
              <CommentsProvider users={commentsUsers} myUserId={myUserId}>
                <div
                  ref={containerRef}
                  className={cn(
                    'relative flex w-full overflow-x-auto',
                    '[&_.slate-start-area-top]:!h-4',
                    '[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px]'
                  )}
                >
                  <Plate
                    editableProps={{
                      autoFocus: true,
                      className: cn(
                        'relative max-w-full leading-[1.4] outline-none [&_strong]:font-bold overflow-y-hidden',
                        '!min-h-[600px] px-[43px]'
                      ),
                    }}
                  >
                    <FloatingToolbar>
                      <FloatingToolbarButtons />
                    </FloatingToolbar>

                    <MentionCombobox items={MENTIONABLES} />

                    <CursorOverlay containerRef={containerRef} />
                  </Plate>
                </div>

                <CommentsPopover />
              </CommentsProvider>
            </div>
          </PlateProvider>
        </div>
      </div>
    </div>
  );
}
