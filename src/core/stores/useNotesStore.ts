'use client'

import { create } from 'zustand';
import { createNote, getNotes, getNote, updateNote, deleteNote } from '@/core/server/server-actions/notes';

type Note = {
  id: string;
  userId: string;
  title: string;
  content: string;
}

type NotesStore = {
  notes: Note[];
  currentNote: Note | null;
  isLoading: boolean;
  error: string | null;
  fetchNotes: (userId: string) => Promise<void>;
  fetchNote: (noteId: string) => Promise<void>;
  addNote: (userId: string, title: string, content: string) => Promise<void>;
  editNote: (noteId: string, title: string, content: string) => Promise<void>;
  removeNote: (noteId: string) => Promise<void>;
}

export const useNotesStore = create<NotesStore>((set, get) => ({
  notes: [],
  currentNote: null,
  isLoading: false,
  error: null,
  fetchNotes: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const fetchedNotes = await getNotes(userId);
      set({ notes: fetchedNotes, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch notes', isLoading: false });
    }
  },
  fetchNote: async (noteId: string) => {
    set({ isLoading: true, error: null });
    try {
      const fetchedNote = await getNote(noteId);
      set({ currentNote: fetchedNote, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch note', isLoading: false });
    }
  },
  addNote: async (userId: string, title: string, content: string) => {
    set({ isLoading: true, error: null });
    try {
      const newNote = await createNote(userId, title, content);
      set((state) => ({ notes: [...state.notes, newNote], isLoading: false }));
    } catch (error) {
      set({ error: 'Failed to add note', isLoading: false });
    }
  },
  editNote: async (noteId: string, title: string, content: string) => {
    set({ isLoading: true, error: null });
    try {
      const updatedNote = await updateNote(noteId, title, content);
      set((state) => ({
        notes: state.notes.map((note) => note.id === noteId ? updatedNote : note),
        currentNote: updatedNote,
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to update note', isLoading: false });
    }
  },
  removeNote: async (noteId: string) => {
    set({ isLoading: true, error: null });
    try {
      await deleteNote(noteId);
      set((state) => ({
        notes: state.notes.filter((note) => note.id !== noteId),
        currentNote: null,
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to delete note', isLoading: false });
    }
  },
}));
