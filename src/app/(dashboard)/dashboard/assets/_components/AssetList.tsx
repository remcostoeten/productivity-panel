"use client";

import { deleteAsset } from "@/core/server/server-actions/storage/upload-assets";
import { useOptimistic } from "react";
import toast from "react-hot-toast";

type Asset = {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  url: string;
  createdAt: number;
};

export default function AssetList({
  initialAssets,
}: {
  initialAssets: Asset[];
}) {
  const [optimisticAssets, addOptimisticAsset] = useOptimistic(
    initialAssets,
    (state, deletedId: string) =>
      state.filter((asset) => asset.id !== deletedId),
  );

  async function handleDelete(id: string) {
    addOptimisticAsset(id);
    try {
      await deleteAsset(id);
      toast.success("Asset deleted successfully");
    } catch (error) {
      toast.error("Delete failed:", error);
      console.error("Delete failed:", error);
    }
  }

  return (
    <ul>
      {optimisticAssets.map((asset) => (
        <li key={asset.id}>
          <a href={asset.url} target="_blank" rel="noopener noreferrer">
            {asset.fileName}
          </a>
          <p>Type: {asset.fileType}</p>
          <p>Size: {(asset.fileSize / 1024 / 1024).toFixed(2)} MB</p>
          <p>Uploaded: {new Date(asset.createdAt * 1000).toLocaleString()}</p>
          <button onClick={() => handleDelete(asset.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
