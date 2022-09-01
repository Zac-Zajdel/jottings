import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World! 🌎️</p>',
  })

  return (
    <>
      <button onClick={() => editor?.chain().focus().toggleBold().run()}>Bold</button>
      <EditorContent editor={editor} />
    </>
  )
}

export default Tiptap
