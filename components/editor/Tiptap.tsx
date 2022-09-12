import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Blockquote from '@tiptap/extension-blockquote'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import BulletList from '@tiptap/extension-bullet-list'
import getSuggestionItems from '@/helpers/tiptap/items'
import renderItems from '@/helpers/tiptap/renderItems'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Commands from '@/helpers/tiptap/Commands'
import { lowlight } from 'lowlight/lib/common.js'

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      HorizontalRule,
      Blockquote,
      ListItem,
      OrderedList,
      BulletList,
      TableRow,
      TableHeader,
      TableCell,
      Table.configure({
        resizable: true,
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Placeholder.configure({
        placeholder: 'Type / for options',
      }),
      Commands.configure({
        suggestion: {
          items: getSuggestionItems,
          render: renderItems,
        },
      }),
    ],
    content: '<p></p>',
  })

  // todo - Set a timeout for every 10 seconds to check if dirty and if so save to database.

  return <EditorContent editor={editor} className="editor" />
}

export default Tiptap
