"use client";

import React, { useEffect } from 'react';
import { Folder, Note } from './notes.types';
import { useNotesStore } from '@/core/stores/useNotesStore';
import Folders from '../note/components/Folders';
import dynamic from 'next/dynamic';
import NoteList from '../note/components/NoteList';
import toast from 'react-hot-toast';

const DynamicTiptap = dynamic(() => import('../../../../components/TipTap.tsx'), { ssr: false });

export default function NotesPageClient({
  initialFolders,
  initialNotes,
  userId,
}: {
  initialFolders: Folder[];
  initialNotes: Note[];
  userId: string;
}) {
  const {
    folders,
    notes,
    currentFolder,
    setCurrentFolder,
    createFolder,
    editFolder,
    addNote,
    removeNote,
    moveNote,
    isLoading,
    error,
    fetchFolders,
    fetchNotes,
    editNote, // Ensure editNote is imported here
  } = useNotesStore();

  useEffect(() => {
    fetchFolders();
    fetchNotes(userId);
  }, [fetchFolders, fetchNotes, userId]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div>
      <h1>Notes</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <Folders
        folders={folders}
        currentFolder={currentFolder}
        setCurrentFolder={setCurrentFolder}
        createFolder={createFolder}
        editFolder={editFolder}
      />
      <NoteList
        notes={notes}
        addNote={addNote}
        removeNote={removeNote}
        moveNote={moveNote}
        editNote={editNote} // Pass editNote as a prop
      />
      <DynamicTiptap />
    </div>
  );
}
