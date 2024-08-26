"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { NoteEditModal } from "./NoteEditModal";
import { useNotesStore } from "@/core/stores/useNotesStore";

interface NoteCardProps {
  note: {
    id: string;
    title: string;
    content: string;
  };
  key: string | number;
}

export default function NoteCard({ note, key }: NoteCardProps) {
  const { removeNote } = useNotesStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <>
      <Card key={key}>
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">{note.title}</h2>
          <p className="text-gray-600">{note.content.substring(0, 100)}...</p>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setIsEditModalOpen(true)}>
            Edit
          </Button>
          <Button variant="destructive" onClick={() => removeNote(note.id)}>
            Delete
          </Button>
        </CardFooter>
      </Card>
      <NoteEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        note={note}
      />
    </>
  );
}
