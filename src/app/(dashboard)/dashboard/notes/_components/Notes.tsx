'use client'

import Flex from "@/components/atoms/Flex";
import Paragraph from "@/components/atoms/Paragraph";
import { Note } from "@/core/server/db/schema";
import { createNote, deleteNote, getNotes, updateNote } from "@/core/server/server-actions/note-actions";
import { AnimatePresence, motion } from "framer-motion";
import { FolderTree, Plus, Search } from "lucide-react";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";
import Onboarding from "./Onboarding";


export const NotesApp: React.FC = () => {
  const [isOnboarding, setIsOnboarding] = React.useState(true);
  const [selectedFolderId, setSelectedFolderId] = React.useState<string | null>(null);
  const [notes,const [notes, setNotes] = React.useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = React.useState<Note | null>(null);
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [searchTerm, setSearchTerm] = React.useState('');
dd
  React.useEffect(() => {
    if (selectedFolderId) {
      getNotes(selectedFolderId).then(setNotes);
    }
  }, [selectedFolderId]);

  const handleCreateNote = async () => {
    if (selectedFolderId) {
      try {
        const newNote = await createNote(title, content, selectedFolderId);
        setNotes([...notes, newNote]);
        setSelectedNote(newNote);
        toast.success('Note created successfully');
      } catch (error) {
        toast.error('Failed to create note');
      }
    } else {
      toast.error('Please select a folder first');
    }
  };

  const handleUpdateNote = async () => {
    if (selectedNote) {
      try {
        const updatedNote = await updateNote(selectedNote.id, title, content, selectedNote.isPublic);
        setNotes(notes.map(note => note.id === updatedNote.id ? updatedNote : note));
        setSelectedNote(updatedNote);
        toast.success('Note updated successfully');
      } catch (error) {
        toast.error('Failed to update note');
      }
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      await deleteNote(noteId);
      setNotes(notes.filter(note => note.id !== noteId));
      if (selectedNote?.id === noteId) {
        setSelectedNote(null);
        setTitle('');
        setContent('');
      }
      toast.success('Note deleted successfully');
    } catch (error) {
      toast.error('Failed to delete note');
    }
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const { pending } = useFormStatus();

  if (isOnboarding) {
    return <Onboarding onComplete={() => setIsOnboarding(false)} />;
  }

  return (
    <Flex className="h-screen bg-[#121212] text-white">
      <Flex dir="col" className="w-1/4 p-4 border-r border-[#2A2A2A]">
        <Flex justify="between" items="center" className="mb-4">
          <Paragraph size="xl" weight="bold">Notes</Paragraph>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-[#1E1E1E] rounded-full"
            onClick={handleCreateNote}
          >
            <Plus size={20} />
          </motion.button>
        </Flex>
        <Flex className="mb-4 bg-[#1E1E1E] rounded p-2">
          <Search size={20} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search notes..."
            className="bg-transparent w-full focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Flex>
        <FolderTree onSelectFolder={setSelectedFolderId} />
      </Flex>
      <Flex dir="col" className="w-3/4 p-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled"
          className="w-full p-2 bg-transparent text-2xl font-bold mb-2 focus:outline-none"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start typing..."
          className="w-full p-2 bg-transparent h-[calc(100vh-200px)] resize-none focus:outline-none"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={selectedNote ? handleUpdateNote : handleCreateNote}
          disabled={pending}
          className="px-4 py-2 bg-[#1E1E1E] text-white rounded hover:bg-[#2A2A2A] mt-4"
        >
          {pending ? 'Saving...' : (selectedNote ? 'Update Note' : 'Create Note')}
        </motion.button>
        <Flex dir="col" className="mt-4">
          <Paragraph as="h2" size="xl" weight="bold" className="mb-2">All Notes</Paragraph>
          <AnimatePresence>
            {filteredNotes.map(note => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Flex justify="between" items="center" className="cursor-pointer hover:bg-[#1E1E1E] p-2 rounded">
                  <Paragraph
                    onClick={() => {
                      setSelectedNote(note);
                      setTitle(note.title);
                      setContent(note.content || '');
                    }}
                  >
                    {note.title}
                  </Paragraph>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDeleteNote(note.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </motion.button>
                </Flex>
              </motion.div>
            ))}
          </AnimatePresence>
        </Flex>
      </Flex>
    </Flex>
  );
};
