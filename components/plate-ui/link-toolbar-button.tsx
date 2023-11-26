import React from 'react';
import {
  useLinkToolbarButton,
  useLinkToolbarButtonState,
} from '@udecode/plate-link';
import { Icons } from '@/components/icons';
import { ToolbarButton } from './toolbar';

export function LinkToolbarButton() {
  const state = useLinkToolbarButtonState();
  const { props } = useLinkToolbarButton(state);

  return (
    <ToolbarButton
      className="hover:bg-accent hover:text-accent-foreground"
      tooltip="Link"
      {...props}
    >
      <Icons.link />
    </ToolbarButton>
  );
}
