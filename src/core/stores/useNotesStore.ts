"use client";

import {
  createFolder,
  createNote,
  deleteFolder,
  deleteNote,
  getFolders,
  getNote,
  getNotes,
  updateNote,
} from "@/core/server/server-actions/notes";
import { create } from "zustand";

interface Note {
  id: string;
  userId: string;
  title: string;
  content: string;
  folderId: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Folder {
  id: string;
  userId: string;
  name: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
}

interface NotesStore {
  notes: Note[];
  folders: Folder[];
  currentNote: Note | null;
  currentFolder: Folder | null;
  isLoading: boolean;
  error: string | null;

  // Note operations
  fetchNotes: (userId: string) => Promise<void>;
  fetchNote: (noteId: string) => Promise<void>;
  addNote: (
    userId: string,
    title: string,
    content: string,
    folderId?: string,
  ) => Promise<void>;
  editNote: (noteId: string, title: string, content: string) => Promise<void>;
  removeNote: (noteId: string) => Promise<void>;
  moveNote: (noteId: string, newFolderId: string | null) => Promise<void>;

  // Folder operations
  fetchFolders: () => Promise<void>;
  createFolder: (name: string, parentId?: string) => Promise<void>;
  deleteFolder: (folderId: string) => Promise<void>;
  setCurrentFolder: (folderId: string | null) => void;

  // Utility functions
  clearError: () => void;
  setLoading: (isLoading: boolean) => void;
}

// Zustand store creation
export const useNotesStore = create<NotesStore>((set, get) => ({
  notes: [],
  folders: [],
  currentNote: null,
  currentFolder: null,
  isLoading: false,
  error: null,

  fetchNotes: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const fetchedNotes = await getNotes(userId);
      set({ notes: fetchedNotes, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch notes", isLoading: false });
      console.error("Error fetching notes:", error);
    }
  },

  fetchNote: async (noteId: string) => {
    set({ isLoading: true, error: null });
    try {
      const fetchedNote = await getNote(noteId);
      set({ currentNote: fetchedNote, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch note", isLoading: false });
      console.error("Error fetching note:", error);
    }
  },

  addNote: async (
    userId: string,
    title: string,
    content: string,
    folderId?: string,
  ) => {
    set({ isLoading: true, error: null });
    try {
      const newNote = await createNote(userId, title, content, folderId);
      set((state) => ({ notes: [...state.notes, newNote], isLoading: false }));
    } catch (error) {
      set({ error: "Failed to add note", isLoading: false });
      console.error("Error adding note:", error);
    }
  },

  editNote: async (noteId: string, title: string, content: string) => {
    set({ isLoading: true, error: null });
    try {
      const updatedNote = await updateNote(noteId, title, content);
      set((state) => ({
        notes: state.notes.map((note) =>
          note.id === noteId ? updatedNote : note,
        ),
        currentNote: updatedNote,
        isLoading: false,
      }));
    } catch (error) {
      set({ error: "Failed to update note", isLoading: false });
      console.error("Error updating note:", error);
    }
  },

  removeNote: async (noteId: string) => {
    set({ isLoading: true, error: null });
    try {
      await deleteNote(noteId);
      set((state) => ({
        notes: state.notes.filter((note) => note.id !== noteId),
        currentNote:
          state.currentNote?.id === noteId ? null : state.currentNote,
        isLoading: false,
      }));
    } catch (error) {
      set({ error: "Failed to delete note", isLoading: false });
      console.error("Error deleting note:", error);
    }
  },

  moveNote: async (noteId: string, newFolderId: string | null) => {
    set({ isLoading: true, error: null });
    try {
      const movedNote = await updateNote(noteId, { folderId: newFolderId });
      set((state) => ({
        notes: state.notes.map((note) =>
          note.id === noteId ? movedNote : note,
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: "Failed to move note", isLoading: false });
      console.error("Error moving note:", error);
    }
  },

  fetchFolders: async () => {
    set({ isLoading: true, error: null });
    try {
      const fetchedFolders = await getFolders();
      set({ folders: fetchedFolders, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch folders", isLoading: false });
      console.error("Error fetching folders:", error);
    }
  },

  createFolder: async (name: string, parentId?: string) => {
    set({ isLoading: true, error: null });
    try {
      const newFolder = await createFolder(name, parentId);
      set((state) => ({
        folders: [...state.folders, newFolder],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: "Failed to create folder", isLoading: false });
      console.error("Error creating folder:", error);
    }
  },

  deleteFolder: async (folderId: string) => {
    set({ isLoading: true, error: null });
    try {
      await deleteFolder(folderId);
      set((state) => ({
        folders: state.folders.filter((folder) => folder.id !== folderId),
        currentFolder:
          state.currentFolder?.id === folderId ? null : state.currentFolder,
        isLoading: false,
      }));
    } catch (error) {
      set({ error: "Failed to delete folder", isLoading: false });
      console.error("Error deleting folder:", error);
    }
  },

  setCurrentFolder: (folderId: string | null) => {
    const folder = folderId
      ? get().folders.find((f) => f.id === folderId) || null
      : null;
    set({ currentFolder: folder });
  },

  clearError: () => set({ error: null }),

  setLoading: (isLoading: boolean) => set({ isLoading }),
}));
