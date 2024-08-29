"use client";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Select } from "@/components/ui/select";
// import { createNote } from "@/core/server/server-actions/notes/create";
// import dynamic from "next/dynamic";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import { Button, Input, Select } from "@/components/ui";
import { createNote, getFolders } from "@/core/server/server-actions/notes";
import dynamic from "next/dynamic";

export default async function CreateNote() {
  const folders = await getFolders();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Note</h1>
      <form action={createNote} className="space-y-4">
        <Input type="text" name="title" placeholder="Note Title" required />
        <Select name="folderId">
          <Select.Trigger>
            <Select.Value placeholder="Select folder" />
          </Select.Trigger>
          <Select.Content>
            {folders?.map((folder) => (
              <Select.Item key={folder.id} value={folder.id}>
                {folder.name}
              </Select.Item>
            ))}
          </Select.Content>
        </Select>
        <Input type="text" name="tags" placeholder="Tags (comma-separated)" />
        <textarea
          name="content"
          placeholder="Note content"
          className="w-full h-64 p-2 border rounded"
          required
        ></textarea>
        <Button type="submit">Save Note</Button>
      </form>
    </div>
  );
}
