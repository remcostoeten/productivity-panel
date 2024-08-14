"use client";

import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  getWishlistsByUser,
  createWishlist,
} from "@/core/server/server-actions/wishlist";
import toast from "react-hot-toast";
import WishlistItem from "./_components/WishlistItem";
import MarketingLayout from "@/app/(marketing)/layout";
import ToolIntro from "@/app/(marketing)/color-tool/_components/ColorToolPageIntro";

export default function WishlistsPage() {
  const { userId } = useAuth();
  const [wishlists, setWishlists] = useState([]);
  const [newWishlistName, setNewWishlistName] = useState("");
  const [newWishlistBudget, setNewWishlistBudget] = useState(0);

  useEffect(() => {
    if (userId) {
      loadWishlists();
    }
  }, []);

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

  function handleWishlistUpdate(updatedWishlists: any) {
    setWishlists(updatedWishlists);
  }

  return (
    <>
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
      <div className="grid gap-4">
        {wishlists.map((wishlist: { id: any }) => (
          <WishlistItem
            userId={userId}
            onWishlistCreated={handleWishlistUpdate}
            wishlist={wishlist}
          />
        ))}
      </div>
    </>
  );
}
