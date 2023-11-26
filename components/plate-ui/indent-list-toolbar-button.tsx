import React from 'react';
import {
  ListStyleType,
  useIndentListToolbarButton,
  useIndentListToolbarButtonState,
} from '@udecode/plate-indent-list';
import { Icons } from '@/components/icons';
import { ToolbarButton, ToolbarButtonProps } from './toolbar';

export function IndentListToolbarButton({
  nodeType = ListStyleType.Disc,
}: ToolbarButtonProps & { nodeType?: ListStyleType }) {
  const state = useIndentListToolbarButtonState({ nodeType });
  const { props } = useIndentListToolbarButton(state);

  return (
    <ToolbarButton
      className="hover:bg-accent hover:text-accent-foreground"
      tooltip={
        nodeType === ListStyleType.Disc ? 'Bulleted List' : 'Numbered List'
      }
      {...props}
    >
      {nodeType === ListStyleType.Disc ? <Icons.ul /> : <Icons.ol />}
    </ToolbarButton>
  );
}
