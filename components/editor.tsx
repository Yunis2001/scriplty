'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Markdown } from 'tiptap-markdown'
import { useCallback, useState } from 'react'
import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'
import { Decoration, DecorationSet } from 'prosemirror-view'

interface EditorProps {
  content: string
  editable?: boolean
  suggestions?: Suggestion[]
}

interface Suggestion {
  index: {
    start: { line: number; column: number; offset: number };
    end: { line: number; column: number; offset: number };
  };
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

const Editor = ({content, editable = false, suggestions = []}: EditorProps) => {
  const [highlightedParagraph, setHighlightedParagraph] = useState<number | null>(null)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Markdown,
      HighlightPlugin.configure({ highlightedParagraph }),
    ],
    content: content,
    editable: editable
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
    <div>
      <EditorContent editor={editor} />
      <div style={{ flex: 1 }}>
        <h3>Suggestions:</h3>
        <ul>
          {suggestions?.map((suggestion, index) => (
            <button key={index} onClick={() => highlightSuggestion(suggestion)}>
              {suggestion.message}
            </button>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Editor