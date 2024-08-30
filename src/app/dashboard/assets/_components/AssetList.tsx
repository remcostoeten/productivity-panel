'use client'

import { deleteAsset, getAssets } from "@/core/server/server-actions/storage/upload-assets";
import { useOptimistic, useState } from "react";
import toast from "react-hot-toast";

export default function AssetList({ initialAssets, totalCount, categories }) {
  const [assets, setAssets] = useState(initialAssets);
  const [optimisticAssets, addOptimisticAsset] = useOptimistic(
    assets,
    (state, deletedId: string) => state.filter((asset) => asset.id !== deletedId)
  );
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");

  async function handleDelete(id: string) {
    addOptimisticAsset(id);
    try {
      await deleteAsset(id);
      toast.success("Asset deleted successfully");
    } catch (error) {
      toast.error("Delete failed");
      console.error("Delete failed:", error);
    }
  }

  async function loadMore() {
    const newPage = page + 1;
    const { assets: newAssets } = await getAssets(newPage, 10, selectedCategory, search);
    setAssets([...assets, ...newAssets]);
    setPage(newPage);
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const { assets: newAssets } = await getAssets(1, 10, selectedCategory, search);
    setAssets(newAssets);
    setPage(1);
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          placeholder="Search assets" 
        />
        <button type="submit">Search</button>
      </form>
      <select 
        onChange={(e) => {
          setSelectedCategory(e.target.value);
          getAssets(1, 10, e.target.value, search).then(({ assets }) => {
            setAssets(assets);
            setPage(1);
          });
        }}
      >
        <option value="">All Categories</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </select>
      <ul>
        {optimisticAssets.map((asset) => (
          <li key={asset.id}>
            <a href={asset.url} target="_blank" rel="noopener noreferrer">
              {asset.fileName}
            </a>
            <p>Type: {asset.fileType}</p>
            <p>Size: {(asset.fileSize / 1024 / 1024).toFixed(2)} MB</p>
            <p>Visibility: {asset.visibility}</p>
            <p>Categories: {asset.categories.map(c => c.name).join(', ')}</p>
            <p>Uploaded: {new Date(asset.createdAt * 1000).toLocaleString()}</p>
            <button onClick={() => handleDelete(asset.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {assets.length < totalCount && (
        <button onClick={loadMore}>Load More</button>
      )}
    </div>
  );
}
