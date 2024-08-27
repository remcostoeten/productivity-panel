import { Folder, Note } from '@/app/(dashboard)/dashboard/notes/notes.types';
import {
    createFolder,
    createNote,
    deleteNote,
    getFolders,
    getNotes,
    updateFolder,
    updateNote
} from '@/core/server/server-actions/notes';
import toast from 'react-hot-toast';
import { create } from 'zustand';

type NotesStore = {
  folders: Folder[];
  notes: Note[];
  currentFolder: Folder | null;
  isLoading: boolean;
  error: string | null;
  fetchFolders: () => Promise<void>;
  fetchNotes: (userId: string, folderId?: string | null) => Promise<void>;
  addNote: (userId: string, title: string, content: string, folderId: string) => Promise<void>;
  editNote: (noteId: string, updates: Partial<Note>) => Promise<void>;
  removeNote: (noteId: string) => Promise<void>;
  moveNote: (noteId: string, newFolderId: string | null) => Promise<void>;
  createFolder: (name: string) => Promise<void>;
  editFolder: (folderId: string, name: string) => Promise<void>;
  setCurrentFolder: (folderId: string | null) => void;
};

export const useNotesStore = create<NotesStore>((set, get) => ({
  folders: [],
  notes: [],
  currentFolder: null,
  isLoading: false,
  error: null,

  fetchFolders: async () => {
    set({ isLoading: true, error: null });
    try {
      const folders = await getFolders();
      set({ folders, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch folders', isLoading: false });
      toast.error('Failed to fetch folders');
    }
  },

  fetchNotes: async (userId, folderId) => {
    set({ isLoading: true, error: null });
    try {
      const notes = await getNotes(userId, folderId);
      set({ notes, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch notes', isLoading: false });
      toast.error('Failed to fetch notes');
    }
  },

  addNote: async (userId, title, content, folderId) => {
    set({ isLoading: true, error: null });
    try {
      const newNote = await createNote(userId, title, content, folderId);
      set((state) => ({ notes: [...state.notes, newNote], isLoading: false }));
      toast.success('Note added successfully');
    } catch (error) {
      set({ error: 'Failed to add note', isLoading: false });
      toast.error('Failed to add note');
    }
  },

  editNote: async (noteId, updates) => {
    set({ isLoading: true, error: null });
    try {
      const updatedNote = await updateNote(noteId, updates);
      set((state) => ({
        notes: state.notes.map((note) => (note.id === noteId ? updatedNote : note)),
        isLoading: false,
      }));
      toast.success('Note updated successfully');
    } catch (error) {
      set({ error: 'Failed to update note', isLoading: false });
      toast.error('Failed to update note');
    }
  },

  removeNote: async (noteId) => {
    set({ isLoading: true, error: null });
    try {
      await deleteNote(noteId);
      set((state) => ({
        notes: state.notes.filter((note) => note.id !== noteId),
        isLoading: false,
      }));
      toast.success('Note removed successfully');
    } catch (error) {
      set({ error: 'Failed to remove note', isLoading: false });
      toast.error('Failed to remove note');
    }
  },

  moveNote: async (noteId, newFolderId) => {
    set({ isLoading: true, error: null });
    try {
      const updatedNote = await updateNote(noteId, { folderId: newFolderId });
      set((state) => ({
        notes: state.notes.map((note) => (note.id === noteId ? updatedNote : note)),
        isLoading: false,
      }));
      toast.success('Note moved successfully');
    } catch (error) {
      set({ error: 'Failed to move note', isLoading: false });
      toast.error('Failed to move note');
    }
  },

  createFolder: async (name) => {
    set({ isLoading: true, error: null });
    try {
      const newFolder = await createFolder(name);
      set((state) => ({ folders: [...state.folders, newFolder], isLoading: false }));
      toast.success('Folder created successfully');
    } catch (error) {
      set({ error: 'Failed to create folder', isLoading: false });
      toast.error('Failed to create folder');
    }
  },

  editFolder: async (folderId, name) => {
    set({ isLoading: true, error: null });
    try {
      const updatedFolder = await updateFolder(folderId, { name });
      set((state) => ({
        folders: state.folders.map((folder) => (folder.id === folderId ? updatedFolder : folder)),
        isLoading: false,
      }));
      toast.success('Folder updated successfully');
    } catch (error) {
      set({ error: 'Failed to update folder', isLoading: false });
      toast.error('Failed to update folder');
    }
  },

  setCurrentFolder: (folderId) => {
    set({ currentFolder: get().folders.find(f => f.id === folderId) || null });
  },
}));
