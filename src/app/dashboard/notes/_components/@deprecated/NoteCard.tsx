"use client";

import {
  Button, Card, CardContent, CardFooter, Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/';
import { useNotesStore } from "@/core/stores/useNotesStore";
import { useState } from "react";
import { NoteCardProps } from "../../notes.types";
import { NoteEditModal } from "./NoteEditModal";

export default function NoteCard({ note, key }: NoteCardProps) {
  const { removeNote, moveNote, folders, editNote } = useNotesStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(note.title);
  const [newContent, setNewContent] = useState(note.content);

  const handleMoveNote = (newFolderId: string) => {
    moveNote(note.id, newFolderId === "none" ? null : newFolderId);
  };

  const handleEditNote = async () => {
    await editNote(note.id, { title: newTitle, content: newContent });
    setIsEditModalOpen(false);
  };

  return (
    <>
      <Card key={note.id} className="flex-wrap pt-6">
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">{note.title}</h2>
          <p className="text-gray-600">
            {note.content.length > 100
              ? `${note.content.substring(0, 100)}...`
              : note.content}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Select
            onValueChange={handleMoveNote}
            defaultValue={note.folderId || "none"}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Move to folder" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No folder</SelectItem>
              {folders.map((folder) => (
                <SelectItem key={folder.id} value={folder.id}>
                  {folder.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="space-x-2">
            <Button variant="outline" onClick={() => setIsEditModalOpen(true)}>
              Edit
            </Button>
            <Button variant="destructive" onClick={() => removeNote(note.id)}>
              Delete
            </Button>
          </div>
        </CardFooter>
      </Card>
      <NoteEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        note={note}
        onEdit={handleEditNote}
        setNewTitle={setNewTitle}
        setNewContent={setNewContent}
      />
    </>
  );
}
