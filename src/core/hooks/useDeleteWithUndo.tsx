"use client";

import { delay } from "framer-motion";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

type DeleteWithUndoOptions<T> = {
  itemName?: string;
  deleteFunction: () => Promise<void>;
  undoFunction: () => Promise<T>;
  onDeleteSuccess?: () => void;
  onUndoSuccess?: (restoredItem: T) => void;
  deleteDelay?: number;
  undoDelay?: number;
  toastDuration?: number;
};

export default function useDeleteWithUndo<T>({
  itemName = "Item",
  deleteFunction,
  undoFunction,
  onDeleteSuccess,
  onUndoSuccess,
  deleteDelay = 3000,
  undoDelay = 3000,
  toastDuration = 5000,
}: DeleteWithUndoOptions<T>) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUndoing, setIsUndoing] = useState(false);

  const deleteWithUndo = useCallback(async () => {
    setIsDeleting(true);
    const toastId = toast.loading(`Deleting ${itemName.toLowerCase()}...`);

    try {
      await delay(deleteDelay);
      await deleteFunction();

      toast.success(
        <span>
          {itemName} deleted
          <button
            style={{
              height: "100%",
              border: "none",
              background: "#333",
              color: "white",
              marginLeft: "7px",
              borderRadius: "4px",
              lineHeight: "20px",
              fontSize: "12px",
            }}
            onClick={async () => {
              setIsUndoing(true);
              toast.promise(
                (async () => {
                  await delay(undoDelay);
                  const restoredItem = await undoFunction();
                  onUndoSuccess?.(restoredItem);
                  setIsUndoing(false);
                  return restoredItem;
                })(),
                {
                  loading: `Restoring ${itemName.toLowerCase()}`,
                  success: `${itemName} restored`,
                  error: "Error when restoring",
                },
                {
                  id: toastId,
                },
              );
            }}
          >
            Undo
          </button>
        </span>,
        {
          duration: toastDuration,
          id: toastId,
        },
      );

      onDeleteSuccess?.();
    } catch (error) {
      toast.error(`Error deleting ${itemName.toLowerCase()}`, { id: toastId });
    } finally {
      setIsDeleting(false);
    }
  }, [
    itemName,
    deleteFunction,
    undoFunction,
    onDeleteSuccess,
    onUndoSuccess,
    deleteDelay,
    undoDelay,
    toastDuration,
  ]);

  return { deleteWithUndo, isDeleting, isUndoing };
}

//  usage

// const { deleteLocalStorageWithUndo, isDeleting, isUndoing } =
// useDeleteLocalStorage({
//   key: "colorFolders",
// });
// const deleteFolder = (folderName: string) => {
// setFolders(folders.filter((folder) => folder.name !== folderName));
// if (activeFolder === folderName) {
//   setActiveFolder(folders[0]?.name || "");
// }
// deleteLocalStorageWithUndo();
// };
