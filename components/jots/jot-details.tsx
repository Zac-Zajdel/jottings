'use client';

import React, { useRef } from 'react';
import { PlateEditor } from '@udecode/plate-common';
import { MyValue } from '@/types/plate-types';
import DocumentEditor from '../document-editor';
import { User } from '@prisma/client';
import { JotHeader } from './jot-header';

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
}

export default function JotDetails({ jot }: JotProps) {
  const editorRef = useRef<PlateEditor>(null);

  return (
    <div>
      <JotHeader
        jot={jot}
        editorRef={editorRef}
      />

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
