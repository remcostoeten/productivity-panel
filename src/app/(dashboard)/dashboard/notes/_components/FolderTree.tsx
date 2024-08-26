"use client";

import { useNotesStore } from "@/core/stores/useNotesStore";
import { useState } from "react";

interface FolderNode {
  id: string;
  name: string;
  children: FolderNode[];
}

export default function FolderTree() {
  const { folders, createFolder, deleteFolder, setCurrentFolder } =
    useNotesStore();
  const [newFolderName, setNewFolderName] = useState("");
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(),
  );

  // Convert flat folder structure to tree
  const buildFolderTree = (folders: any[]): FolderNode[] => {
    const folderMap = new Map<string, FolderNode>();
    folders.forEach((folder) => {
      folderMap.set(folder.id, { ...folder, children: [] });
    });

    const rootFolders: FolderNode[] = [];
    folders.forEach((folder) => {
      if (folder.parentId) {
        const parent = folderMap.get(folder.parentId);
        if (parent) {
          parent.children.push(folderMap.get(folder.id)!);
        }
      } else {
        rootFolders.push(folderMap.get(folder.id)!);
      }
    });

    return rootFolders;
  };

  const folderTree = buildFolderTree(folders);

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(folderId)) {
        next.delete(folderId);
      } else {
        next.add(folderId);
      }
      return next;
    });
  };

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      createFolder(newFolderName.trim());
      setNewFolderName("");
    }
  };

  const handleDeleteFolder = (folderId: string) => {
    if (confirm("Are you sure you want to delete this folder?")) {
      deleteFolder(folderId);
    }
  };

  const renderFolder = (folder: FolderNode, depth: number = 0) => {
    const isExpanded = expandedFolders.has(folder.id);

    return (
      <div key={folder.id} style={{ marginLeft: `${depth * 20}px` }}>
        <div className="flex items-center py-2">
          {folder.children.length > 0 && (
            <button onClick={() => toggleFolder(folder.id)} className="mr-2">
              {isExpanded ? "▼" : "►"}
            </button>
          )}
          <span
            onClick={() => setCurrentFolder(folder.id)}
            className="cursor-pointer hover:text-blue-500"
          >
            {folder.name}
          </span>
          <button
            onClick={() => handleDeleteFolder(folder.id)}
            className="ml-2 text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
        {isExpanded &&
          folder.children.map((child) => renderFolder(child, depth + 1))}
      </div>
    );
  };

  return (
    <div className="mt-4">
      <div className="mb-4">
        <input
          type="text"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          placeholder="New folder name"
          className="border p-2 mr-2"
        />
        <button
          onClick={handleCreateFolder}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Folder
        </button>
      </div>
      <div className="border rounded p-4">
        {folderTree.map((folder) => renderFolder(folder))}
      </div>
    </div>
  );
}
