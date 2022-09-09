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

  return <EditorContent editor={editor} className="editor" />
}

export default Tiptap
