"use client"

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { 
  Bold, 
  Italic, 
  Underline,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon
} from "lucide-react"

interface SimpleRichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

export function SimpleRichTextEditor({ content, onChange, placeholder = "Start writing your prompt..." }: SimpleRichTextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [isPreview, setIsPreview] = useState(false)

  const insertText = (before: string, after: string = '') => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)
    
    const newText = content.substring(0, start) + before + selectedText + after + content.substring(end)
    onChange(newText)

    // Reset cursor position
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length)
    }, 0)
  }

  const formatText = (tag: string) => {
    switch (tag) {
      case 'bold':
        insertText('**', '**')
        break
      case 'italic':
        insertText('*', '*')
        break
      case 'underline':
        insertText('<u>', '</u>')
        break
      case 'h1':
        insertText('# ')
        break
      case 'h2':
        insertText('## ')
        break
      case 'h3':
        insertText('### ')
        break
      case 'ul':
        insertText('- ')
        break
      case 'ol':
        insertText('1. ')
        break
      case 'link':
        insertText('[', '](url)')
        break
      case 'image':
        insertText('![alt text](', ')')
        break
    }
  }

  const renderPreview = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^- (.*$)/gm, '<li>$1</li>')
      .replace(/^\d+\. (.*$)/gm, '<li>$1</li>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width: 100%; height: auto;" />')
      .replace(/\n/g, '<br>')
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => formatText('bold')}
            className="h-8 w-8 p-0"
            title="Bold (**text**)"
          >
            <Bold className="h-4 w-4" />
          </Button>
          
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => formatText('italic')}
            className="h-8 w-8 p-0"
            title="Italic (*text*)"
          >
            <Italic className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => formatText('underline')}
            className="h-8 w-8 p-0"
            title="Underline"
          >
            <Underline className="h-4 w-4" />
          </Button>
        </div>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => formatText('h1')}
            className="px-2 h-8 text-xs"
            title="Heading 1"
          >
            H1
          </Button>
          
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => formatText('h2')}
            className="px-2 h-8 text-xs"
            title="Heading 2"
          >
            H2
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => formatText('h3')}
            className="px-2 h-8 text-xs"
            title="Heading 3"
          >
            H3
          </Button>
        </div>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => formatText('ul')}
            className="h-8 w-8 p-0"
            title="Bullet List"
          >
            <List className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => formatText('ol')}
            className="h-8 w-8 p-0"
            title="Numbered List"
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
        </div>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => formatText('link')}
            className="h-8 w-8 p-0"
            title="Link [text](url)"
          >
            <LinkIcon className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => formatText('image')}
            className="h-8 w-8 p-0"
            title="Image ![alt](url)"
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
        </div>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <Button
          type="button"
          variant={isPreview ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setIsPreview(!isPreview)}
          className="px-3 h-8 text-xs"
        >
          {isPreview ? 'Edit' : 'Preview'}
        </Button>
      </div>

      {/* Content Area */}
      <div className="relative">
        {isPreview ? (
          <div 
            className="prose prose-sm max-w-none p-4 min-h-[300px] bg-white"
            dangerouslySetInnerHTML={{ __html: renderPreview(content) }}
          />
        ) : (
          <Textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="min-h-[300px] border-0 resize-none focus:ring-0 rounded-none font-mono text-sm"
            style={{ 
              fontSize: '14px',
              lineHeight: '1.5',
              fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace'
            }}
          />
        )}
      </div>

      {/* Help Text */}
      <div className="px-4 py-2 text-xs text-gray-500 bg-gray-50 border-t">
        Use Markdown syntax: **bold**, *italic*, # Heading, - List, [link](url), ![image](url)
      </div>
    </div>
  )
}
