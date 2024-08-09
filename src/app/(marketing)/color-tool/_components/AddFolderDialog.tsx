"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Textarea,
} from "@/components/ui";
import { useState } from "react";
import { AddFolderDialogProps } from "../types.color-tool";

export default function AddFolderDialog({
  isOpen,
  onClose,
  onAddFolder,
}: AddFolderDialogProps) {
  const [newFolderName, setNewFolderName] = useState("Folder name");
  const [newFolderDescription, setNewFolderDescription] = useState("");

  const handleAddFolder = () => {
    onAddFolder(newFolderName, newFolderDescription);
    setNewFolderName("Folder name");
    setNewFolderDescription("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Folder</DialogTitle>
        </DialogHeader>
        <div>
          <div className="space-y-4">
            <Input
              placeholder="Folder Name"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddFolder();
                } else if (e.key === "Escape") {
                  onClose();
                }
              }}
            />
            <Textarea
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Description (optional)"
              value={newFolderDescription}
              onChange={(e) => setNewFolderDescription(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="flex !justify-between w-[100%] items-center">
          <Button variant="destructive" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="outline" onClick={handleAddFolder}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
