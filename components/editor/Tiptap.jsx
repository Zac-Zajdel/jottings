import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import getSuggestionItems from "@/helpers/tiptap/items"
import renderItems from "@/helpers/tiptap/renderItems"
import Commands from "@/helpers/tiptap/Commands"

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Type / for options',
      }),
      Commands.configure({
        suggestion: {
          items: getSuggestionItems,
          render: renderItems
        }
      })
    ],
    content: '<p></p>',
  })

  return (
    <EditorContent editor={editor} className="editor" />
  )
}

export default Tiptap
