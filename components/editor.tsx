'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Markdown } from 'tiptap-markdown'
import { useCallback, useState } from 'react'
import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'
import { Decoration, DecorationSet } from 'prosemirror-view'
import SuggestionsComponent from './document/suggestions-component'
import { Button } from './ui/button'
import { toast } from 'sonner'

interface EditorProps {
  content: string
  editable?: boolean
  suggestions?: Suggestion[]
  documentId?:number
}

interface Suggestion {
  index: {
    start: { line: number; column: number; offset: number };
    end: { line: number; column: number; offset: number };
  };
  [key: string]: any;
  message: string;
  original: string;
  suggestion: string;
  type: string;
}

const HighlightPlugin = Extension.create({
  name: 'highlightPlugin',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('highlight'),
        props: {
          decorations: (state) => {
            const { doc } = state
            const decorations: Decoration[] = []

            const highlightedParagraph = this.options.highlightedParagraph

            if (highlightedParagraph !== null) {
              doc.descendants((node, pos) => {
                if (node.type.name === 'paragraph' && pos <= highlightedParagraph && pos + node.nodeSize > highlightedParagraph) {
                  decorations.push(
                    Decoration.node(pos, pos + node.nodeSize, {
                      class: 'highlighted-paragraph',
                    })
                  )
                  return false // stop iteration
                }
              })
            }

            return DecorationSet.create(doc, decorations)
          },
        },
      }),
    ]
  },
})

const Editor = ({content, editable = false, suggestions = [],documentId}: EditorProps) => {
  const [highlightedParagraph, setHighlightedParagraph] = useState<number | null>(null)
  const [editorContent , setEditorContent] = useState("")

  const updateContent = async()=> {
    try {
      const response = await fetch('/api/update-content',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({document_id:documentId,content:editorContent}),
      })

      const data = await response.json();
      if(response.ok){
        toast.success(data.message);
      }
      else {
        toast.error(data.message);
      }
      console.log(data);
    } catch (error) {
      
    }
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      Markdown,
      HighlightPlugin.configure({ highlightedParagraph }),
    ],
    content: content,
    editable: editable,
    onUpdate({editor}) {
      setEditorContent(editor.getHTML());
    }
  })

  const highlightSuggestion = useCallback((suggestion: Suggestion) => {
    if (editor) {
      const { from } = editor.state.selection
      editor.chain().focus().setTextSelection(suggestion.index.start.offset+10).run()
      const { from: newFrom } = editor.state.selection
      setHighlightedParagraph(newFrom)
    }
  }, [editor])

  return (
    <div className='relative'>
      <div className='flex gap-5'>
        <EditorContent editor={editor} />
        <SuggestionsComponent suggestions={suggestions} hightlightSuggestion={highlightSuggestion} />   
      </div>
      {documentId &&
        <Button className='bg-blue-500' onClick={updateContent}>Save Document</Button>
      }
    </div>
  )
}

export default Editor