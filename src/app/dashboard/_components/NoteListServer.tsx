import React from 'react';
import NoteList from './NoteList';
import { getAllNotes } from './StatsCards';

export default async function NoteListServer({ searchQuery }: { searchQuery: string }) {
    const initialNotes = await getAllNotes();

    return <NoteList searchQuery={searchQuery} initialNotes={initialNotes} />;
}
