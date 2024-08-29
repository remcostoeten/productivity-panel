"use client";

import { uploadAsset } from "@/core/server/server-actions/storage/upload-assets";
import { useRef, useState, useTransition } from "react";

export default function AssetUploader() {
  const [isPending, startTransition] = useTransition();
  const [progress, setProgress] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    setProgress(0);
    startTransition(async () => {
      try {
        await uploadAsset(formData);
        formRef.current?.reset();
        setProgress(100);
      } catch (error) {
        console.error("Upload failed:", error);
        setProgress(0);
      }
    });
  }

  return (
    <form ref={formRef} action={handleSubmit}>
      <input type="file" name="file" required onChange={() => setProgress(0)} />
      <button type="submit" disabled={isPending}>
        {isPending ? "Uploading..." : "Upload Asset"}
      </button>
      {progress > 0 && <progress value={progress} max="100" />}
    </form>
  );
}
