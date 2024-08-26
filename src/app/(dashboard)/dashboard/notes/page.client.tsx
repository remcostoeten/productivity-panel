"use client";

import { SimpleSpinnerDelayed } from "@/components/effect/loaders";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useKeyboard } from "@/core/hooks/useKbdKeyyboard";
import { deleteFolder } from "@/core/server/server-actions/notes";
import { useNotesStore } from "@/core/stores/useNotesStore";
import { Edit, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import NoteCard from "./_components/NoteCard";
import { NotesPageClientProps } from "./notes.types";

export default function NotesPageClient({
  initialFolders,
  initialNotes,
  userId,
  folders: propFolders, // Renamed to avoid conflict
  notes: propNotes, // Renamed to avoid conflict
}: NotesPageClientProps) {
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
  } = useNotesStore();
  const [newFolderName, setNewFolderName] = useState("");
  const [newNoteName, setNewNoteName] = useState("");
  const [selectedFolder, setSelectedFolder] = useState<
    (typeof folders)[0] | null
  >(null);
  const [selectedNote, setSelectedNote] = useState<(typeof notes)[0] | null>(
    null,
  );
  const [editingFolderId, setEditingFolderId] = useState<string | null>(null);
  const [editingFolderName, setEditingFolderName] = useState("");
  const { key } = useKeyboard();

  useEffect(() => {
    useNotesStore.setState({ folders: initialFolders, notes: initialNotes });
    fetchFolders();
    fetchNotes(userId, currentFolder?.id); // Pass the current folder ID
  }, [initialFolders, initialNotes, userId, currentFolder, fetchFolders, fetchNotes]);

  const handleCreateFolder = async () => {
    if (newFolderName.trim()) {
      await createFolder(newFolderName.trim());
      setNewFolderName("");
    }
  };

  const handleCreateNote = async () => {
    if (selectedFolder && newNoteName.trim()) {
      await addNote(userId, newNoteName.trim(), "", selectedFolder.id);
      setNewNoteName("");
      fetchNotes(userId);
    }
  };

  const handleEnterSubmit = (callback: () => void) => {
    if (key === "Enter") {
      callback();
    }
  };

  useEffect(() => {
    handleEnterSubmit(handleCreateFolder);
  }, [key, newFolderName]);

  useEffect(() => {
    handleEnterSubmit(handleCreateNote);
  }, [key, newNoteName]);

  const handleFolderSelect = (folder: (typeof folders)[0]) => {
    setSelectedFolder(folder);
    setCurrentFolder(folder.id);
  };

  const handleEditFolder = (folder: (typeof folders)[0]) => {
    setEditingFolderId(folder.id);
    setEditingFolderName(folder.name);
  };

  const handleSaveEditFolder = async () => {
    if (editingFolderId && editingFolderName.trim()) {
      await editFolder(editingFolderId, editingFolderName.trim());
      setEditingFolderId(null);
      setEditingFolderName("");
      fetchFolders();
    }
  };

  const handleDeleteFolder = async (folderId: string) => {
    await deleteFolder(folderId);
    fetchFolders();
    if (selectedFolder?.id === folderId) {
      setSelectedFolder(null);
      setCurrentFolder(null);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="flex flex-wrap w-full p-6 m-10 h-full">
        <div className="pr-4 w-1/3">
          <h2 className="text-xl font-bold mb-4">Folders</h2>
          <div className="mb-4 flex relative w-full">
            <Input
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="New folder name"
              className="mr-2"
            />
            <Button onClick={handleCreateFolder}>Create</Button>
          </div>
          {folders && folders.length > 0 ? (
            <ul>
              {folders.map((folder) => (
                <li
                  key={folder.id}
                  className={`flex items-center justify-between p-2 rounded ${selectedFolder?.id === folder.id ? "bg-dark-section--lighter border" : ""}`}
                >
                  {editingFolderId === folder.id ? (
                    <>
                      <Input
                        value={editingFolderName}
                        onChange={(e) => setEditingFolderName(e.target.value)}
                        className="mr-2"
                      />
                      <Button onClick={handleSaveEditFolder}>Save</Button>
                    </>
                  ) : (
                    <>
                      <span
                        className="cursor-pointer flex-grow"
                        onClick={() => handleFolderSelect(folder)}
                      >
                        {folder.name}
                      </span>
                      <div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEditFolder(folder)}
                          className="mr-2"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteFolder(folder.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                        {isLoading && <SimpleSpinnerDelayed />}
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div>No folders available. Create one to get started!</div>
          )}
        </div>
        <div className="w-2/3">
          <h2 className="text-xl font-bold mb-4">Notes</h2>
          {selectedFolder ? (
            <>
              <div className="mb-4 flex">
                <Input
                  value={newNoteName}
                  onChange={(e) => setNewNoteName(e.target.value)}
                  placeholder="New note name"
                  className="mr-2"
                />
                <Button onClick={handleCreateNote}>Create Note</Button>
              </div>
              {notes && notes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {notes.map((note) => (
                    <NoteCard key={note.id} note={note} />
                  ))}
                </div>
              ) : (
                <div>No notes in this folder. Create one to get started!</div>
              )}
            </>
          ) : (
            <div>Select a folder to view or create notes.</div>
          )}
        </div>
      </div>
    </>
  );
}
