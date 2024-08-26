"use client";

import { useNotesStore } from "@/core/stores/useNotesStore";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import FolderTree from "./_components/FolderTree";
import NoteCard from "./_components/NoteCard";

export default function NotesPage() {
  const { user } = useUser();
  const { notes, isLoading, error, fetchNotes, addNote, fetchFolders } =
    useNotesStore();

  useEffect(() => {
    if (user) {
      fetchNotes(user.id);
      fetchFolders();
    }
  }, [user, fetchNotes, fetchFolders]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4 flex">
      <div className="w-1/4 pr-4">
        <h2 className="text-xl font-bold mb-4">Folders</h2>
        <FolderTree />
      </div>
      <div className="w-3/4">
        <h1 className="text-2xl font-bold mb-4">My Notes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() =>
            user && addNote(user.id, "New Note", "Start writing...")
          }
        >
          Add Note
        </button>
      </div>
    </div>
  );
}
