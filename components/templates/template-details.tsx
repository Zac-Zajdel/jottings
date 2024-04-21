'use client';

import React, { useRef } from 'react';
import { PlateEditor } from '@udecode/plate-common';
import { MyValue } from '@/types/plate-types';
import DocumentEditor from '../document-editor';
import { Label, LabelAssociation, User } from '@prisma/client';
import { TemplateHeader } from './template-header';
import { RecoilRoot } from 'recoil';

interface LabelAssociations extends LabelAssociation {
  label: Label;
}

interface TemplateProps {
  jotTemplate: {
    id: string
    title: string
    content: MyValue
    createdAt: Date
    updatedAt: Date
    author: User
    labelAssociations: LabelAssociations[]
  },
}

export default function TemplateDetails({ jotTemplate }: TemplateProps) {
  const editorRef = useRef<PlateEditor>(null);

  return (
    <div>
      <RecoilRoot>
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
      </RecoilRoot>
    </div>
  );
}
