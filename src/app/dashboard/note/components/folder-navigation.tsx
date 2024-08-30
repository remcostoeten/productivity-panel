import {
  Button, Input
} from '@/components/ui/';
import Link from "next/link";

import { Folder, Plus } from "lucide-react";
import { createFolder } from "@/core/server/server-actions/notes";

export default function FolderNavigation({ folders }) {
  return (
    <div className="w-64 h-screen bg-gray-100 p-4">
      <h2 className="text-lg font-semibold mb-4">Folders</h2>
      <form action={createFolder} className="flex mb-4">
        <Input
          type="text"
          name="folderName"
          placeholder="New folder"
          className="mr-2"
        />
        <Button type="submit">
          <Plus className="h-4 w-4" />
        </Button>
      </form>
      <ul>
        {folders?.map((folder) => (
          <li key={folder.id}>
            <Link
              href={`/folders/${folder.id}`}
              className="flex items-center hover:bg-gray-200 p-2 rounded"
            >
              <Folder className="h-4 w-4 mr-2" />
              {folder.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
