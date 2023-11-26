import React from 'react';
import { useOutdentButton } from '@udecode/plate-indent';
import { Icons } from '@/components/icons';
import { ToolbarButton } from './toolbar';

export function OutdentToolbarButton() {
  const { props } = useOutdentButton();

  return (
    <ToolbarButton
      className="hover:bg-accent hover:text-accent-foreground"
      tooltip="Outdent"
      {...props}
    >
      <Icons.outdent />
    </ToolbarButton>
  );
}
