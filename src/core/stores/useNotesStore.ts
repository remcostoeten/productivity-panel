"use client";

import { Folder, Note } from "@/app/(dashboard)/dashboard/notes/notes.types";
import {
    createFolder,
    createNote,
    deleteFolder,
    deleteNote,
    getFolders,
    getNotes,
    updateFolder,
    updateNote
} from "@/core/server/server-actions/notes";
import toast from "react-hot-toast";
import { create } from "zustand";

type NotesStore = {
  notes: Note[];
  folders: Folder[];
  currentNote: Note | null;
  currentFolder: Folder | null;
  isLoading: boolean;
  error: string | null;

  fetchNotes: (userId: string, folderId: string | null) => Promise<void>;
  fetchNote: (noteId: string) => Promise<void>;
  addNote: (
    userId: string,
    title: string,
    content: string,
    folderId?: string | null,
  ) => Promise<void>;
  editNote: (noteId: string, data: Partial<Note>) => Promise<void>;
  removeNote: (noteId: string) => Promise<void>;
  moveNote: (noteId: string, newFolderId: string | null) => Promise<void>;

  fetchFolders: () => Promise<void>;
  createFolder: (name: string, parentId?: string) => Promise<void>;
  editFolder: (folderId: string, name: string) => Promise<void>;
  deleteFolder: (folderId: string) => Promise<void>;
  setCurrentFolder: (folderId: string | null) => void;

  clearError: () => void;
  setLoading: (isLoading: boolean) => void;
};

export const useNotesStore = create<NotesStore>((set, get) => ({
  notes: [],
  folders: [],
  currentNote: null,
  currentFolder: null,
  isLoading: false,
  error: null,

  fetchNotes: async (userId: string, folderId: string | null) => {
    set({ isLoading: true, error: null });
    try {
      const fetchedNotes = await getNotes(userId, folderId); // Updated to include folderId
      set({ notes: fetchedNotes, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch notes", isLoading: false });
      console.error("Error fetching notes:", error);
      toast.error("Failed to fetch notes");
    }
  },

  fetchNote: async (noteId: string) => {
    set({ isLoading: true, error: null });
    try {
      const fetchedNote = await getNote(noteId);
      set({ currentNote: fetchedNote, isLoading: false });
      toast.success("Note fetched successfully");
    } catch (error) {
      set({ error: "Failed to fetch note", isLoading: false });
      console.error("Error fetching note:", error);
      toast.error("Failed to fetch note");
    }
  },

  addNote: async (
    userId: string,
    title: string,
    content: string,
    folderId: string | null = null,
  ) => {
    set({ isLoading: true, error: null });
    try {
      const newNote = await createNote(userId, title, content, folderId);
      set((state) => ({ notes: [...state.notes, newNote], isLoading: false }));
      toast.success("Note added successfully");
    } catch (error) {
      set({ error: "Failed to add note", isLoading: false });
      console.error("Error adding note:", error);
      toast.error("Failed to add note");
    }
  },

  editNote: async (noteId: string, data: Partial<Note>) => {
    set({ isLoading: true, error: null });
    try {
      const updatedNote = await updateNote(noteId, data);
      set((state) => ({
        notes: state.notes.map((note) =>
          note.id === noteId ? { ...note, ...updatedNote } : note,
        ),
        currentNote:
          state.currentNote?.id === noteId
            ? { ...state.currentNote, ...updatedNote }
            : state.currentNote,
        isLoading: false,
      }));
      toast.success("Note updated successfully");
    } catch (error) {
      set({ error: "Failed to update note", isLoading: false });
      console.error("Error updating note:", error);
      toast.error("Failed to update note");
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
      toast.success("Note deleted successfully");
    } catch (error) {
      set({ error: "Failed to delete note", isLoading: false });
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note");
    }
  },

  moveNote: async (noteId: string, newFolderId: string | null) => {
    set({ isLoading: true, error: null });
    try {
      const updatedNote = await updateNote(noteId, { folderId: newFolderId });
      set((state) => ({
        notes: state.notes.map((note) =>
          note.id === noteId ? { ...note, ...updatedNote } : note,
        ),
        currentNote:
          state.currentNote?.id === noteId
            ? { ...state.currentNote, ...updatedNote }
            : state.currentNote,
        isLoading: false,
      }));
      toast.success("Note moved successfully");
    } catch (error) {
      set({ error: "Failed to move note", isLoading: false });
      console.error("Error moving note:", error);
      toast.error("Failed to move note");
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
      toast.error("Failed to fetch folders");
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
      toast.success("Folder created successfully");
    } catch (error) {
      set({ error: "Failed to create folder", isLoading: false });
      console.error("Error creating folder:", error);
      toast.error("Failed to create folder");
    }
  },

  editFolder: async (folderId: string, name: string) => {
    set({ isLoading: true, error: null });
    try {
      await updateFolder(folderId, name);
      set((state) => ({
        folders: state.folders.map((folder) =>
          folder.id === folderId ? { ...folder, name } : folder,
        ),
        isLoading: false,
      }));
      toast.success("Folder updated successfully");
    } catch (error) {
      set({ error: "Failed to update folder", isLoading: false });
      console.error("Error updating folder:", error);
      toast.error("Failed to update folder");
    }
  },

  deleteFolder: async (folderId: string) => {
    set({ isLoading: true, error: null });
    try {
      await deleteFolder(folderId);
      set((state) => ({
        folders: state.folders.filter((folder) => folder.id !== folderId),
        isLoading: false,
      }));
      toast.success("Folder deleted successfully");
    } catch (error) {
      set({ error: "Failed to delete folder", isLoading: false });
      console.error("Error deleting folder:", error);
      toast.error("Failed to delete folder");
    }
  },

  setCurrentFolder: (folderId: string | null) => {
    set({ currentFolder: folderId ? get().folders.find(folder => folder.id === folderId) : null });
  },

  clearError: () => set({ error: null }),
  setLoading: (isLoading: boolean) => set({ isLoading }),
}));
