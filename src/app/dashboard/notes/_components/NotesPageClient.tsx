"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Folder, Note } from "../notes.types";

const DynamicTiptap = dynamic(() => import("./Tiptap"), { ssr: false });

type NotesPageClientProps = {
  initialFolders: Folder[];
  initialNotes: Note[];
  userId: string;
};

export default function NotesPageClient({
  initialFolders,
  initialNotes,
  userId,
}: NotesPageClientProps) {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleNoteSelect = (note: Note) => {
    setSelectedNote(note);
  };

  const handleNoteUpdate = (updatedNote: Note) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === updatedNote.id ? updatedNote : note,
      ),
    );
  };

  return (
    <div>
      {/* Implement your folder and note list components here */}
      {selectedNote && (
        <DynamicTiptap
          note={selectedNote}
          onUpdate={handleNoteUpdate}
          userId={userId}
        />
      )}
    </div>
  );
}
