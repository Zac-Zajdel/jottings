import React from 'react';
import { useIndentButton } from '@udecode/plate-indent';
import { Icons } from '@/components/icons';
import { ToolbarButton } from './toolbar';

export function IndentToolbarButton() {
  const { props } = useIndentButton();

  return (
    <ToolbarButton
      className="hover:bg-accent hover:text-accent-foreground"
      tooltip="Indent"
      {...props}
    >
      <Icons.indent />
    </ToolbarButton>
  );
}
