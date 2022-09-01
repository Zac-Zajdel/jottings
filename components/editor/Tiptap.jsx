import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import getSuggestionItems from "../../helpers/items.js"
import renderItems from "../../helpers/renderItems"
import Commands from "../../helpers/Commands"

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // placeholder: 'Type / for more options',
      }),
      Commands.configure({
        suggestion: {
          items: getSuggestionItems,
          render: renderItems
        }
      })
    ],
    content: '<p>Hello World! 🌎️</p>',
  })

  return (
    <>
      {/* <button onClick={() => editor?.chain().focus().toggleBold().run()}>Bold</button> */}
      <EditorContent editor={editor} className="editor" />
    </>
  )
}

export default Tiptap
