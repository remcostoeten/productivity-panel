'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useNotesStore } from "@/core/stores/useNotesStore"
import { Edit, FilePlus, FolderPlus, Lock, Share2, Tag, Trash } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { Folder, Note } from "./notes.types"

const DynamicTiptap = dynamic(() => import('../../../../components/TipTap.tsx'), { ssr: false })

export default function NotesPageClient({
    initialFolders,
    initialNotes,
    userId,
}: {
    initialFolders: Folder[]
    initialNotes: Note[]
    userId: string
}) {
    const {
        addNote,
        setCurrentFolder,
        currentFolder,
        createFolder,
        folders,
        notes,
        fetchFolders,
        fetchNotes,
        isLoading,
        error,
        editFolder,
        removeNote,
        moveNote,
        editNote,
    } = useNotesStore()

    const [newFolderName, setNewFolderName] = useState("")
    const [newNoteName, setNewNoteName] = useState("")
    const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null)
    const [selectedNote, setSelectedNote] = useState<Note | null>(null)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [editingNote, setEditingNote] = useState<Note | null>(null)
    const [newTag, setNewTag] = useState("")
    const [isShareModalOpen, setIsShareModalOpen] = useState(false)
    const [sharingNote, setSharingNote] = useState<Note | null>(null)

    useEffect(() => {
        useNotesStore.setState({ folders: initialFolders, notes: initialNotes })
        fetchFolders()
        fetchNotes(userId, currentFolder?.id)
    }, [initialFolders, initialNotes, userId, currentFolder, fetchFolders, fetchNotes])

    const handleCreateFolder = async () => {
        if (newFolderName.trim()) {
            await createFolder(newFolderName.trim())
            setNewFolderName("")
            fetchFolders()
        }
    }

    const handleCreateNote = async () => {
        if (selectedFolder && newNoteName.trim()) {
            await addNote(userId, newNoteName.trim(), selectedFolder.id)
            setNewNoteName("")
            fetchNotes(userId, selectedFolder.id)
        }
    }

    const handleFolderSelect = async (folder: Folder) => {
        setSelectedFolder(folder)
        setCurrentFolder(folder.id)
        await fetchNotes(userId, folder.id)
    }

    const handleEditNote = async (noteId: string, title: string, content: string, tags: string[], isPrivate: boolean) => {
        await editNote(noteId, { title, content, tags, isPrivate })
        setIsEditModalOpen(false)
        setEditingNote(null)
        fetchNotes(userId, currentFolder?.id)
    }

    const handleDeleteNote = async (noteId: string) => {
        await removeNote(noteId)
        fetchNotes(userId, currentFolder?.id)
    }

    const handleMoveNote = async (noteId: string, newFolderId: string) => {
        await moveNote(noteId, newFolderId === "none" ? null : newFolderId)
        fetchNotes(userId, currentFolder?.id)
    }

    const handleAddTag = (note: Note) => {
        if (newTag.trim() && !note.tags.includes(newTag.trim())) {
            const updatedTags = [...note.tags, newTag.trim()]
            handleEditNote(note.id, note.title, note.content, updatedTags, note.isPrivate)
            setNewTag("")
        }
    }

    const handleRemoveTag = (note: Note, tagToRemove: string) => {
        const updatedTags = note.tags.filter(tag => tag !== tagToRemove)
        handleEditNote(note.id, note.title, note.content, updatedTags, note.isPrivate)
    }

    const handleTogglePrivate = (note: Note) => {
        handleEditNote(note.id, note.title, note.content, note.tags, !note.isPrivate)
    }

    const handleShareNote = (note: Note) => {
        setSharingNote(note)
        setIsShareModalOpen(true)
    }

    if (error) {
        return <div className="text-error">Error: {error}</div>
    }

    return (
        <div className="flex flex-col md:flex-row gap-6 p-6 bg-black text-white min-h-screen">
            <div className="w-full md:w-1/4 space-y-6">
                <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="p-4">
                        <h2 className="text-xl font-bold mb-4">Folders</h2>
                        <div className="flex items-center space-x-2 mb-4">
                            <Input
                                value={newFolderName}
                                onChange={(e) => setNewFolderName(e.target.value)}
                                placeholder="New folder name"
                                className="bg-gray-800 border-gray-700 text-white"
                            />
                            <Button onClick={handleCreateFolder} className="bg-blue-600 hover:bg-blue-700">
                                <FolderPlus className="h-4 w-4 mr-2" />
                                Create
                            </Button>
                        </div>
                        {folders && folders.length > 0 ? (
                            <ul className="space-y-2">
                                {folders.map((folder) => (
                                    <li
                                        key={folder.id}
                                        className={`p-2 rounded cursor-pointer ${selectedFolder?.id === folder.id ? "bg-gray-800" : "hover:bg-gray-800"}`}
                                        onClick={() => handleFolderSelect(folder)}
                                    >
                                        {folder.name}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No folders available. Create one to get started!</p>
                        )}
                    </CardContent>
                </Card>
            </div>
            <div className="w-full md:w-3/4 space-y-6">
                <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="p-4">
                        <h2 className="text-xl font-bold mb-4">Notes</h2>
                        {selectedFolder ? (
                            <>
                                <div className="flex items-center space-x-2 mb-4">
                                    <Input
                                        value={newNoteName}
                                        onChange={(e) => setNewNoteName(e.target.value)}
                                        placeholder="New note name"
                                        className="bg-gray-800 border-gray-700 text-white"
                                    />
                                    <Button onClick={handleCreateNote} className="bg-green-600 hover:bg-green-700">
                                        <FilePlus className="h-4 w-4 mr-2" />
                                        Create Note
                                    </Button>
                                </div>
                                {isLoading ? (
                                    <p>Loading notes...</p>
                                ) : notes && notes.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {notes.map((note) => (
                                            <Card key={note.id} className="bg-gray-800 border-gray-700">
                                                <CardContent className="p-4">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <h3 className="text-lg font-semibold">{note.title}</h3>
                                                        <div className="flex items-center space-x-2">
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => handleTogglePrivate(note)}
                                                                className={note.isPrivate ? "text-red-500" : "text-green-500"}
                                                            >
                                                                {note.isPrivate ? <Lock className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => handleShareNote(note)}
                                                                className="text-blue-500"
                                                            >
                                                                <Share2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-400 mb-2">
                                                        {note.content.length > 100
                                                            ? `${note.content.substring(0, 100)}...`
                                                            : note.content}
                                                    </p>
                                                    <div className="flex flex-wrap gap-2 mb-2">
                                                        {note.tags.map((tag) => (
                                                            <Badge
                                                                key={tag}
                                                                variant="secondary"
                                                                className="bg-gray-700 text-white"
                                                            >
                                                                {tag}
                                                                <button
                                                                    onClick={() => handleRemoveTag(note, tag)}
                                                                    className="ml-2 text-xs text-gray-400 hover:text-gray-200"
                                                                >
                                                                    ×
                                                                </button>
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <Input
                                                            value={newTag}
                                                            onChange={(e) => setNewTag(e.target.value)}
                                                            placeholder="Add tag"
                                                            className="bg-gray-700 border-gray-600 text-white"
                                                        />
                                                        <Button
                                                            onClick={() => handleAddTag(note)}
                                                            size="sm"
                                                            className="bg-blue-600 hover:bg-blue-700"
                                                        >
                                                            <Tag className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                    <p className="text-sm text-gray-500 mt-2">
                                                        Last updated: {new Date(note.updatedAt).toLocaleString()}
                                                    </p>
                                                </CardContent>
                                                <CardFooter className="bg-gray-900 p-4 flex justify-between">
                                                    <Select
                                                        onValueChange={(value) => handleMoveNote(note.id, value)}
                                                        defaultValue={note.folderId || "none"}
                                                    >
                                                        <SelectTrigger className="w-[140px] bg-gray-800 border-gray-700 text-white">
                                                            <SelectValue placeholder="Move to folder" />
                                                        </SelectTrigger>
                                                        <SelectContent className="bg-gray-800 border-gray-700 text-white">
                                                            <SelectItem value="none">No folder</SelectItem>
                                                            {folders.map((folder) => (
                                                                <SelectItem key={folder.id} value={folder.id}>
                                                                    {folder.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <div className="space-x-2">
                                                        <Button
                                                            variant="outline"
                                                            onClick={() => {
                                                                setEditingNote(note)
                                                                setIsEditModalOpen(true)
                                                            }}
                                                            className="bg-gray-700 hover:bg-gray-600"
                                                        >
                                                            <Edit className="h-4 w-4 mr-2" />
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            variant="destructive"
                                                            onClick={() => handleDeleteNote(note.id)}
                                                            className="bg-red-600 hover:bg-red-700"
                                                        >
                                                            <Trash className="h-4 w-4 mr-2" />
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </CardFooter>
                                            </Card>
                                        ))}
                                    </div>
                                ) : (
                                    <p>No notes in this folder. Create one to get started!</p>
                                )}
                            </>
                        ) : (
                            <p>Select a folder to view or create notes.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent className="bg-gray-900 text-white">
                    <DialogHeader>
                        <DialogTitle>Edit Note</DialogTitle>
                    </DialogHeader>
                    {editingNote && (
                        <>
                            <Input
                                value={editingNote.title}
                                onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
                                placeholder="Note title"
                                className="mb-4 bg-gray-800 border-gray-700 text-white"
                            />
                            <DynamicTiptap
                                content={editingNote.content}
                                onChange={(newContent) => setEditingNote({ ...editingNote, content: newContent })}
                            />
                            <div className="flex items-center space-x-2 mt-4">
                                <Switch
                                    checked={editingNote.isPrivate}
                                    onCheckedChange={(checked) => setEditingNote({ ...editingNote, isPrivate: checked })}
                                />
                                <span>Private</span>
                            </div>
                        </>
                    )}
                    <DialogFooter>
                        <Button
                            type="submit"
                            onClick={() => editingNote && handleEditNote(editingNote.id, editingNote.title, editingNote.content, editingNote.tags, editingNote.isPrivate)}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            Save changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Dialog open={isShareModalOpen} onOpenChange={setIsShareModalOpen}>
                <DialogContent className="bg-gray-900 text-white">
                    <DialogHeader>
                        <DialogTitle>Share Note</DialogTitle>
                    </DialogHeader>
                    {sharingNote && (
                        <>
                            <p>Share this URL to give access to your note:</p>
                            <Input
                                value={`${window.location.origin}/shared-note/${sharingNote.id}`}
                                readOnly
                                className="bg-gray-800 border-gray-700 text-white"
                            />
                            <p className="text-sm text-gray-400">
                                Note: This link will only work if the note is not set to private.
                            </p>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
