"use client";

import { CheckIcon, LoaderIcon, UndoIcon, XIcon } from "lucide-react";
import toast, { ToastOptions } from "react-hot-toast";
import Flex from "~/src/components/atoms/Flex";
import { Button } from "~/src/components/ui";

const baseStyle = {
  background: "#000",
  color: "#fff",
  borderRadius: "6px",
  padding: "12px 16px",
  fontSize: "14px",
  maxWidth: "350px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
};

type ToastProps = {
  message: string;
  emoji?: string;
  duration?: number;
};

export default function useToast() {
  const showToast = (options: ToastOptions & ToastProps) => {
    const { message, emoji, duration = 4000, ...rest } = options;

    const style = { ...baseStyle };

    const content = (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {emoji && <span>{emoji}</span>}
        <span>{message}</span>
      </div>
    );

    return toast(content, { duration, style, ...rest });
  };

  const success = (options: ToastProps) =>
    showToast({ icon: <CheckIcon size={10} />, ...options });

  const error = (options: ToastProps) =>
    showToast({ icon: <XIcon size={10} />, ...options });

  const loading = (options: ToastProps) =>
    showToast({
      icon: <LoaderIcon size={10} className="animate-spin" />,
      ...options,
      duration: 0,
    });

  const pending = (options: ToastProps & { onSuccess: () => void }) => {
    const { onSuccess, ...rest } = options;

    const toastId = showToast({
      icon: <LoaderIcon size={14} className="animate-spin" />,
      ...rest,
      duration: 0,
    });

    return {
      success: () => {
        toast.success(options.message, {
          id: toastId,
          icon: <CheckIcon size={10 />,
        });

        onSuccess?.();
      },
    };
  };

  const undo = (
    options: ToastProps & { onUndo: (item: any) => void; deletedItem: any },
  ) => {
    const { onUndo, deletedItem, ...rest } = options;
    return toast(
      (t) => (
        <Flex gap="2" className="items-center">
          <span>Deleted "{deletedItem.name}"</span>
          <Button
            variant="outline"
            size="sm"
            className="space-x-2"
            onClick={() => {
              onUndo(deletedItem); // Call the onUndo function with the deleted item
              toast.success(`Restored "${deletedItem.name}"`);
              toast.dismiss(t.id);
            }}
          >
            <UndoIcon size={10.5} /> {/* Adjusted size to be 25% smaller */}
            <span>Undo</span>
          </Button>
        </Flex>
      ),
      {
        duration: 5000,
        style: {
          ...baseStyle,
          padding: "8px 12px",
        },
      },
    );
  };

  return { showToast, success, error, loading, pending, undo };
};
