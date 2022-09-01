import { Extension } from '@tiptap/core'
import { Editor } from '@tiptap/react'
import Suggestion from '@tiptap/suggestion'

interface Command {
  editor: Editor;
  range: {
    from: number;
    to: number;
  };
  props: {
    title: string;
    command: Function;
  };
}

const Commands = Extension.create({
  name: 'mention',

  addOptions() {
    return {
      suggestion: {
        char: '/',
        command: ({ editor, range, props }: Command) => {
          props.command({ editor, range })
        },
      },
    }
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ]
  },
})

export default Commands
