"use client";

import { Flex } from "@c/atoms/Flex";
import Paragraph from "@c/atoms/Paragraph";
import { getFolders } from "@server/server-actions/folder-actions";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight, FolderIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface Folder {
  id: string;
  name: string;
  userId: string;
  parentId: string | null;
  createdAt: number;
  updatedAt: number;
}

interface FolderNodeProps {
  folder: Folder;
  level: number;
  onSelectFolder: (folderId: string) => void;
}

interface FolderTreeProps {
  onSelectFolder: (folderId: string) => void;
}

function FolderNode({ folder, level, onSelectFolder }: FolderNodeProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [subFolders, setSubFolders] = useState<Folder[]>([]);

  useEffect(() => {
    const loadSubFolders = async () => {
      const folders = await getFolders();
      setSubFolders(folders.filter((f) => f.parentId === folder.id));
    };
    if (isOpen) {
      loadSubFolders();
    }
  }, [isOpen, folder.id]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Flex
        as="div"
        items="center"
        className={`cursor-pointer hover:bg-[#2A2A2A] p-1 rounded pl-${level * 4}`}
        onClick={() => {
          setIsOpen(!isOpen);
          onSelectFolder(folder.id);
        }}
      >
        {isOpen ? (
          <ChevronDown size={16} className="text-gray-400" />
        ) : (
          <ChevronRight size={16} className="text-gray-400" />
        )}
        <FolderIcon size={16} className="mr-2 text-gray-400" />
        <Paragraph size="sm" className="text-gray-300">
          {folder.name}
        </Paragraph>
      </Flex>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {subFolders.map((subFolder) => (
              <FolderNode
                key={subFolder.id}
                folder={subFolder}
                level={level + 1}
                onSelectFolder={onSelectFolder}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FolderTree({ onSelectFolder }: FolderTreeProps) {
  const [rootFolders, setRootFolders] = useState<Folder[]>([]);

  useEffect(() => {
    const loadRootFolders = async () => {
      const folders = await getFolders();
      setRootFolders(folders.filter((f) => !f.parentId));
    };
    loadRootFolders();
  }, []);

  return (
    <Flex dir="col" className="bg-[#121212] rounded p-2">
      <AnimatePresence>
        {rootFolders.map((folder) => (
          <FolderNode
            key={folder.id}
            folder={folder}
            level={0}
            onSelectFolder={onSelectFolder}
          />
        ))}
      </AnimatePresence>
    </Flex>
  );
}
