"use client";

import Skeleton from "@/components/effect/skeletons/generic-skeleton";
import { useNotesStore } from "@/core/stores/useNotesStore";
import { useState } from "react";
import FolderTree from "./_components/FolderTree";
import NoteCard from "./_components/NoteCard";
import { NotesPageClientProps } from "./notes.types";

export default function NotesPageClient({
  folders,
  notes,
  userId,
  isLoadingFolders,
  isLoadingNotes,
}: NotesPageClientProps) {
  const { addNote, setCurrentFolder, currentFolder } = useNotesStore(
    (state) => ({
      addNote: state.addNote,
      setCurrentFolder: state.setCurrentFolder,
      currentFolder: state.currentFolder,
    }),
  );

  const [selectedFolder, setSelectedFolder] = useState<string | null>(
    currentFolder?.id || null,
  );

  const handleAddNote = () => {
    if (selectedFolder) {
      addNote(userId, "New Note", "Start writing...", selectedFolder);
    } else {
      alert("Please select a folder before adding a note.");
    }
  };

  return (
    <div className="p-4 flex">
      <div className="w-1/4 pr-4">
        <h2 className="text-xl font-bold mb-4">Folders</h2>
        {isLoadingFolders ? (
          <div>
            <Skeleton className="h-6 mb-2 w-full" />
            <Skeleton className="h-6 mb-2 w-3/4" />
            <Skeleton className="h-6 mb-2 w-1/2" />
          </div>
        ) : (
          <FolderTree folders={folders} onFolderSelect={setSelectedFolder} />
        )}
      </div>
      <div className="w-3/4">
        <h1 className="text-2xl font-bold mb-4">My Notes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoadingNotes
            ? Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-40 w-full mb-4" />
              ))
            : notes.map((note) => <NoteCard key={note.id} note={note} />)}
        </div>
        <button
          className={`mt-4 px-4 py-2 rounded text-white ${
            selectedFolder
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          onClick={handleAddNote}
          disabled={!selectedFolder}
        >
          Add Note
        </button>
      </div>
    </div>
  );
}
