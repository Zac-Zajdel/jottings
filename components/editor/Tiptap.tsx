import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Blockquote from '@tiptap/extension-blockquote'
import getSuggestionItems from '@/helpers/tiptap/items'
import renderItems from '@/helpers/tiptap/renderItems'
import Commands from '@/helpers/tiptap/Commands'

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      HorizontalRule,
      Blockquote,
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
