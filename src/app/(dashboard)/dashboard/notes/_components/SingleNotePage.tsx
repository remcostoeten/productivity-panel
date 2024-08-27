'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useNotesStore } from '@/core/stores/useNotesStore'
import { Lock, Share2, Tag } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Note } from '../notes.types'

const DynamicTiptap = dynamic(() => import('../_components/Tiptap'), { ssr: false })

export default function SingleNotePage({ note: initialNote, isShared = false }: { note?: Note, isShared?: boolean }) {
  const params = useParams()
  const { fetchNoteById, editNote } = useNotesStore()
  const [note, setNote] = useState<Note | null>(initialNote || null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState('')
  const [editedContent, setEditedContent] = useState('')
  const [newTag, setNewTag] = useState('')

  useEffect(() => {
    const loadNote = async () => {
      if (!initialNote && params.id) {
        const fetchedNote = await fetchNoteById(params.id as string)
        setNote(fetchedNote)
        setEditedTitle(fetchedNote.title)
        setEditedContent(fetchedNote.content)
      }
    }
    loadNote()
  }, [params.id, fetchNoteById, initialNote])

  if (!note) {
    return <div className="flex justify-center items-center h-screen bg-black text-white">Loading...</div>
  }

  const handleSave = async () => {
    if (note) {
      await editNote(note.id, { title: editedTitle, content: editedContent })
      setNote({ ...note, title: editedTitle, content: editedContent })
      setIsEditing(false)
    }
  }

  const handleAddTag = async () => {
    if (note && newTag.trim() && !note.tags.includes(newTag.trim())) {
      const updatedTags = [...note.tags, newTag.trim()]
      await editNote(note.id, { tags: updatedTags })
      setNote({ ...note, tags: updatedTags })
      setNewTag('')
    }
  }

  const handleRemoveTag = async (tagToRemove: string) => {
    if (note) {
      const updatedTags = note.tags.filter(tag => tag !== tagToRemove)
      await editNote(note.id, { tags: updatedTags })
      setNote({ ...note, tags: updatedTags })
    }
  }

  const handleTogglePrivate = async () => {
    if (note) {
      await editNote(note.id, { isPrivate: !note.isPrivate })
      setNote({ ...note, isPrivate: !note.isPrivate })
    }
  }

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <div className="max-w-3xl mx-auto">
        {isEditing ? (
          <>
            <Input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="text-2xl font-bold mb-4 bg-gray-800 border-gray-700 text-white"
            />
            <DynamicTiptap
              content={editedContent}
              onChange={setEditedContent}
              editable={true}
            />
            <div className="mt-4 flex justify-end space-x-2">
              <Button onClick={() => setIsEditing(false)} variant="outline">Cancel</Button>
              <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">Save</Button>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">{note.title}</h1>
              {!isShared && (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleTogglePrivate}
                    className={note.isPrivate ? "text-red-500" : "text-green-500"}
                  >
                    {note.isPrivate ? <Lock className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="text-blue-500"
                  >
                    Edit
                  </Button>
                </div>
              )}
            </div>
            <DynamicTiptap content={note.content} editable={false} />
          </>
        )}
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Tags</h2>
          <div className="flex flex-wrap gap-2 mb-2">
            {note.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-gray-700 text-white"
              >
                {tag}
                {!isShared && (
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-xs text-gray-400 hover:text-gray-200"
                  >
                    ×
                  </button>
                )}
              </Badge>
            ))}
          </div>
          {!isShared && (
            <div className="flex items-center space-x-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add tag"
                className="bg-gray-700 border-gray-600 text-white"
              />
              <Button
                onClick={handleAddTag}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Tag className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Last updated: {new Date(note.updatedAt).toLocaleString()}
        </p>
      </div>
    </div>
  )
}
