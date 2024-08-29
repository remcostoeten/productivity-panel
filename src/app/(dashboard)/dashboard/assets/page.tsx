"use client";

import AssetList from "./_components/AssetList";
import AssetUploader from "./_components/AssetUploader";
import { getAssets } from "@actions/storage/upload-assets";
import { useAuth } from "@clerk/nextjs";

export default async function AssetsPage() {
  const { userId } = useAuth();
  if (!userId) return <div>Please log in to view your assets.</div>;

  const assets = await getAssets();

  return (
    <div>
      <h1>Your Assets</h1>
      <AssetUploader />
      <AssetList initialAssets={assets} />
    </div>
  );
}
