"use client"

import "@/styles/editor.css"
import { useState, useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from "react"
import EditorJS from "@editorjs/editorjs"
import { Task } from "@prisma/client"
import { taskPatchSchema } from "@/lib/validations/task"

interface EditorProps {
  task: Pick<Task, "content">
}

export type EditorHandle = {
  getChildData: () => void;
};

export const Editor = forwardRef<EditorHandle, EditorProps>(({ task }, ref) => {
  const editorRef = useRef<EditorJS>()
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useImperativeHandle(ref, () => ({
    getChildData: async () => {
      const blocks = await editorRef.current?.save()
      return blocks;
    },
  }));

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default
    const Header = (await import("@editorjs/header")).default
    const Embed = (await import("@editorjs/embed")).default
    const Table = (await import("@editorjs/table")).default
    const List = (await import("@editorjs/list")).default
    const Code = (await import("@editorjs/code")).default
    const LinkTool = (await import("@editorjs/link")).default
    const InlineCode = (await import("@editorjs/inline-code")).default

    const body = taskPatchSchema.parse(task)

    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          editorRef.current = editor
        },
        placeholder: "Type here to write your task...",
        inlineToolbar: true,
        data: body.content,
        tools: {
          header: Header,
          linkTool: LinkTool,
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      })
    }
  }, [task])

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true)
    }
  }, [])

  useEffect(() => {
    if (isMounted) {
      initializeEditor()
    }
  }, [isMounted, initializeEditor])

  if (!isMounted) {
    return null
  }

  return (
    <div className="grid w-full gap-10">
      <div className="prose prose-stone mx-auto w-[800px] dark:prose-invert">
        <div
          id="editor"
          className="min-h-[500px]"
        />
      </div>
    </div>
  )
})
