'use client'

import { Suspense } from "react";
import AssetList from "./_components/AssetList";
import AssetUploader from "./_components/AssetUploader";
import { getAssets, getCategories } from "@/core/server/server-actions/storage/upload-assets";
import { useAuth } from "@clerk/nextjs";

export default async function AssetsPage() {
  const { userId } = useAuth();
  if (!userId) return <div>Please log in to view your assets.</div>;

  const { assets, totalCount } = await getAssets();
  const categories = await getCategories();

  return (
    <div>
      <h1>Your Assets</h1>
      <AssetUploader categories={categories} />
      <Suspense fallback={<div>Loading assets...</div>}>
        <AssetList initialAssets={assets} totalCount={totalCount} categories={categories} />
      </Suspense>
    </div>
  );
}
