'use client';

import React, { useRef } from 'react';
import { PlateEditor } from '@udecode/plate-common';
import { MyValue } from '@/types/plate-types';
import DocumentEditor from '../document-editor';
import { User } from '@prisma/client';
import { TemplateHeader } from './template-header';

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
  const editorRef = useRef<PlateEditor>(null);

  return (
    <div>
      <TemplateHeader
        jotTemplate={jotTemplate}
        editorRef={editorRef}
      />

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
