'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { CommentsProvider } from '@udecode/plate-comments';
import { Plate, PlateProvider } from '@udecode/plate-common';
import { commentsUsers, myUserId } from '@/lib/plate/comments';
import { MENTIONABLES } from '@/lib/plate/mentionables';
import { plugins } from '@/lib/plate/plate-plugins';
import { CommentsPopover } from '@/components/plate-ui/comments-popover';
import { CursorOverlay } from '@/components/plate-ui/cursor-overlay';
import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar';
import { FixedToolbarButtons } from '@/components/plate-ui/fixed-toolbar-buttons';
import { FloatingToolbar } from '@/components/plate-ui/floating-toolbar';
import { FloatingToolbarButtons } from '@/components/plate-ui/floating-toolbar-buttons';
import { MentionCombobox } from '@/components/plate-ui/mention-combobox';
import { MyValue } from '@/types/plate-types';
import { atom, useRecoilState } from 'recoil';

interface EditorProps {
  editorRef: any
  content: {
    id: string
    title: string
    content: MyValue
    createdAt: Date
  }
}

export const isEditorAltered = atom({
  key: 'isEditorAltered',
  default: false,
});

export default function DocumentEditor({ editorRef, content }: EditorProps) {
  const containerRef = useRef(null);
  const [initialValue, setInitialValue] = useState({})
  const [_, setEditor] = useRecoilState(isEditorAltered);

  // todo - also need to account for title
  // Store the initial value of the Jots content to compare on changes
  useEffect(() => {
    setInitialValue(JSON.stringify(content.content))
  }, [])

  function seeChange(event) {
    if (JSON.stringify(event) === initialValue) {
      setEditor(false)
    } else {
      setEditor(true)
    }
  }

  return (
    <div className="border rounded-md border-gray-400 border-opacity-20 mx-8">
      <div className="grid w-full gap-5">
        <PlateProvider
          plugins={plugins}
          editorRef={editorRef}
          initialValue={content.content}
          onChange={seeChange}
        >
          <FixedToolbar>
            <FixedToolbarButtons />
          </FixedToolbar>

          <div className="flex overflow-y-hidden max-h-[80vh]">
            <CommentsProvider
              users={commentsUsers}
              myUserId={myUserId}
            >
              <div
                ref={containerRef}
                className={cn(
                  'relative flex w-full overflow-x-auto',
                )}
              >
                <Plate
                  editableProps={{
                    autoFocus: true,
                    className: cn(
                      'relative max-w-full leading-[1.4] outline-none [&_strong]:font-bold overflow-y-hidden',
                      '!min-h-[600px] px-[15px]'
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
  );
}
