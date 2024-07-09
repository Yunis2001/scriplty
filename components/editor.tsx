'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

interface EditorProps {
    content:string
    editable?:boolean,
}

const Editor = ({content,editable=false}:EditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    editable:editable
  })

  return <EditorContent editor={editor} />
}

export default Editor