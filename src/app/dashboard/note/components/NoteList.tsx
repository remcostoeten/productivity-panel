import React from 'react';
import { Note } from '../../notes/notes.types';

interface NoteListProps {
    notes: Note[];
    addNote: (userId: string, title: string, content: string, folderId: string | null) => Promise<void>;
    removeNote: (noteId: string) => Promise<void>;
    moveNote: (noteId: string, newFolderId: string | null) => Promise<void>;
    editNote: (noteId: string, updates: Partial<Note>) => Promise<void>; // Ensure editNote is defined here
}

const NoteList: React.FC<NoteListProps> = ({
    notes,
    addNote,
    removeNote,
    moveNote,
    editNote, // Ensure editNote is received as a prop
}) => {
    return (
        <div>
            <h2>Notes</h2>
            <button onCli ck={() => addNote('userId', 'New Note', 'Content', null)}>Add Note</button>
            {notes.map((note) => (
                <div key={note.id}>
                    <span>{note.title}</span>
                    <button onClick={() => editNote(note.id, { title: 'Updated Title' })}>Edit</button>
                    <button onClick={() => removeNote(note.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default NoteList;
