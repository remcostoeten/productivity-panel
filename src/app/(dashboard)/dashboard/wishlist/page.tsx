"use client";

import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  createWishlist,
  getWishlistItemsByWishlist,
  getWishlistsByUser,
} from "@/core/server/server-actions/wishlist";
import toast from "react-hot-toast";
import WishlistItem from "./_components/WishlistDisplay";

export default function WishlistsPage() {
  const { userId } = useAuth();
  const [wishlists, setWishlists] = useState([]);
  const [newWishlistName, setNewWishlistName] = useState("");
  const [newWishlistBudget, setNewWishlistBudget] = useState(0);

  useEffect(() => {
    if (userId) {
      loadWishlists();
    }
  }, [userId]);

  async function loadWishlists() {
    const wishlists = await getWishlistsByUser(userId);
    setWishlists(wishlists);
  }

  async function handleCreateWishlist(e: { preventDefault: () => void }) {
    e.preventDefault();

    await createWishlist(userId, newWishlistName, newWishlistBudget);

    setNewWishlistName("");
    setNewWishlistBudget(0);

    toast({
      title: "Wishlist created",
    });

    loadWishlists();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Wishlists</h1>

      <form onSubmit={handleCreateWishlist} className="flex gap-2 mb-4">
        <Input
          value={newWishlistName}
          onChange={(e: { target: { value: any } }) =>
            setNewWishlistName(e.target.value)
          }
          placeholder="Wishlist name"
        />
        <Input
          value={newWishlistBudget}
          onChange={(e: { target: { value: any } }) =>
            setNewWishlistBudget(Number(e.target.value))
          }
          placeholder="Budget"
          type="number"
        />
        <Button type="submit">Create Wishlist</Button>
      </form>

      <Button onClick={loadWishlists}>Refresh</Button>

      <div className="grid gap-4">
        {wishlists.map((wishlist: { id: any }) => (
          <WishlistItem key={wishlist.id} wishlist={wishlist} />
        ))}
      </div>
    </div>
  );
}
