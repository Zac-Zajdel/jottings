'use client';

import React, { useRef } from 'react';
import { PlateEditor } from '@udecode/plate-common';
import { MyValue } from '@/types/plate-types';
import DocumentEditor from '../document-editor';
import { Label, LabelAssociation, User } from '@prisma/client';
import { JotHeader } from './jot-header';
import { RecoilRoot } from 'recoil';

interface LabelAssociations extends LabelAssociation {
  label: Label;
}

interface JotProps {
  jot: {
    id: string
    title: string
    content: MyValue
    status: string
    priority: string | null
    createdAt: Date
    updatedAt: Date
    published: boolean
    author: User
    labelAssociations: LabelAssociations[]
  },
}

export default function JotDetails({ jot }: JotProps) {
  const editorRef = useRef<PlateEditor>(null);

  return (
    <div>
      <RecoilRoot>
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
      </RecoilRoot>
    </div>
  );
}
