import { Editor } from '@tiptap/react'

interface Command {
  editor: Editor;
  range: {
    from: number;
    to: number;
  };
}

interface Item {
  title: string;
  command: Function;
}

const getSuggestionItems = ({ query }: { query: string }): Array<Item> => {
  return [
    {
      title: 'H1',
      command: ({ editor, range }: Command) => {
        editor.chain().focus().deleteRange(range).setNode('heading', { level: 1 }).run()
      },
    },
    {
      title: 'H2',
      command: ({ editor, range }: Command) => {
        editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 }).run()
      },
    },
    {
      title: 'bold',
      command: ({ editor, range }: Command) => {
        editor.chain().focus().deleteRange(range).setMark('bold').run()
      },
    },
    {
      title: 'italic',
      command: ({ editor, range }: Command) => {
        editor.chain().focus().deleteRange(range).setMark('italic').run()
      },
    },
  ]
    .filter((item) => item.title.toLowerCase().startsWith(query.toLowerCase()))
    .slice(0, 10)
}

export default getSuggestionItems
