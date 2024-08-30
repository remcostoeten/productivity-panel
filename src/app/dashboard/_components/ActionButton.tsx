'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useUser } from '@clerk/nextjs'
import { Folder, Plus } from 'lucide-react'
import { useState } from 'react'
import { createFolder, createNote } from './@actions/dash-actions'

export function ActionButtons() {
  const { user } = useUser()
  const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false)
  const [isNewNoteDialogOpen, setIsNewNoteDialogOpen] = useState(false)
  const [newFolderName, setNewFolderName] = useState('')
  const [newNoteTitle, setNewNoteTitle] = useState('')
  const [newNoteContent, setNewNoteContent] = useState('')

  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newFolderName) return

    const formData = new FormData()
    formData.append('folderName', newFolderName)

    try {
      await createFolder(formData)
      setNewFolderName('')
      setIsNewFolderDialogOpen(false)
    } catch (error) {
      console.error('Failed to create folder:', error)
    }
  }

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newNoteTitle || !newNoteContent || !user) return

    try {
      await createNote(user.id, newNoteTitle, newNoteContent, null)
      setNewNoteTitle('')
      setNewNoteContent('')
      setIsNewNoteDialogOpen(false)
    } catch (error) {
      console.error('Failed to create note:', error)
    }
  }

  return (
    <div className="flex justify-end space-x-4">
      <Dialog open={isNewFolderDialogOpen} onOpenChange={setIsNewFolderDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Folder className="mr-2 h-4 w-4" />
            New Folder
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateFolder}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="folderName" className="text-right">
                  Name
                </Label>
                <Input
                  id="folderName"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit">Create Folder</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isNewNoteDialogOpen} onOpenChange={setIsNewNoteDialogOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Note
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Note</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateNote}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="noteTitle" className="text-right">
                  Title
                </Label>
                <Input
                  id="noteTitle"
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="noteContent" className="text-right">
                  Content
                </Label>
                <textarea
                  id="noteContent"
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  className="col-span-3 p-2 border rounded"
                  rows={4}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit">Create Note</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
