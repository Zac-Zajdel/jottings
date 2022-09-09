import { Editor } from '@tiptap/react'

interface Command {
  editor: Editor;
  range: {
    from: number;
    to: number;
  };
}

interface Suggestions {
  section: string;
  options: Array<Options>;
}

interface Options {
  title: string;
  description: string;
  command: Function;
}

const getSuggestionItems = ({ query }: { query: string }): Array<Suggestions> => {
  return [
    {
      section: 'Styles',
      options: [
        {
          title: 'Heading 1',
          description: 'Big section heading.',
          command: ({ editor, range }: Command) => {
            editor.chain().focus().deleteRange(range).setNode('heading', { level: 1 }).run()
          },
        },
        {
          title: 'Heading 2',
          description: 'Medium section heading.',
          command: ({ editor, range }: Command) => {
            editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 }).run()
          },
        },
        {
          title: 'Bold',
          description: 'Small section heading.',
          command: ({ editor, range }: Command) => {
            editor.chain().focus().deleteRange(range).setMark('bold').run()
          },
        },
        {
          title: 'Italic',
          description: 'Just start writing.',
          command: ({ editor, range }: Command) => {
            editor.chain().focus().deleteRange(range).setMark('italic').run()
          },
        },
      ],
    },
  ]
    .filter(
      (item) =>
        item.options.filter((option) =>
          option.title.toLowerCase().startsWith(query.toLowerCase()),
        )[0],
    )
    .slice(0, 10)
}

export default getSuggestionItems
