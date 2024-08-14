"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, Input, Button } from "@/components/ui";
import { toast } from "react-hot-toast";
import { WishlistComponentProps } from "../v0.types";
import { useWishlistStore } from "@/core/stores/useWishlistStore";
import { TrashIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { WishlistItem } from "@/core/types/types.wishlist";
import AddItemDialog from "./AddItemDialog";
import { deleteWishlist } from "@/core/server/server-actions/wishlist";
import { motion, AnimatePresence } from "framer-motion";

export default function WishlistComponent({ userId }: WishlistComponentProps) {
  const {
    wishlists,
    isLoading,
    error,
    fetchWishlists,
    addWishlist,
    addWishlistItem,
    removeWishlistItem,
  } = useWishlistStore();

  const [localWishlists, setLocalWishlists] = useState(wishlists);

  useEffect(() => {
    fetchWishlists(userId);
  }, [userId, fetchWishlists]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    setLocalWishlists(wishlists);
  }, [wishlists]);

  const handleAddWishlist = async () => {
    const name = prompt("Enter wishlist name");
    const budgetStr = prompt("Enter wishlist budget");
    if (name && budgetStr) {
      const budget = parseInt(budgetStr, 10);
      if (!isNaN(budget)) {
        try {
          await addWishlist(userId, name, budget);
          toast.success("Wishlist added successfully");
        } catch (error) {
          toast.error("Failed to add wishlist");
        }
      } else {
        toast.error("Invalid budget value");
      }
    }
  };

  const handleAddWishlistItem = async (
    wishlistId: string,
    name: string,
    price: number,
  ) => {
    // Optimistically update the local state
    setLocalWishlists((prevWishlists) => {
      return prevWishlists.map((wishlist) => {
        if (wishlist.id === wishlistId) {
          return {
            ...wishlist,
            items: [
              ...wishlist.items,
              { id: Date.now().toString(), name, price },
            ],
          };
        }
        return wishlist;
      });
    });

    try {
      // Add the item on the server
      await addWishlistItem(wishlistId, name, price);
      toast.success("Item added successfully");
    } catch (error) {
      // If the server request fails, revert the optimistic update
      setLocalWishlists((prevWishlists) => {
        return prevWishlists.map((wishlist) => {
          if (wishlist.id === wishlistId) {
            return {
              ...wishlist,
              items: wishlist.items.filter((item) => item.name !== name),
            };
          }
          return wishlist;
        });
      });
      toast.error("Failed to add item");
    }
  };

  const removeEntireWishlist = async (wishlistId: string) => {
    try {
      await deleteWishlist(wishlistId);
      setLocalWishlists((prev) =>
        prev.filter((wishlist) => wishlist.id !== wishlistId),
      );
      toast.success("Wishlist removed successfully");
    } catch (error) {
      toast.error("Failed to remove wishlist");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid gap-4">
        <div className="grid gap-6">
          <AnimatePresence>
            {localWishlists.map((wishlist) => (
              <motion.div
                key={wishlist.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.9 }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              >
                <Card className="border">
                  <CardHeader className="bg-muted/20 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold">{wishlist.name}</h2>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeEntireWishlist(wishlist.id)}
                      >
                        <Trash2Icon />
                      </Button>
                    </div>
                    <p className="text-muted-foreground">
                      Budget: {wishlist.budget} euros
                    </p>
                  </CardHeader>
                  <CardContent className="px-6 py-4">
                    <ul className="grid gap-4">
                      {wishlist.items.map((item: WishlistItem) => (
                        <li
                          key={item.name}
                          className="grid grid-cols-[1fr_auto] items-center gap-4"
                        >
                          <div className="grid gap-1">
                            <h3 className="font-medium">{item.name}</h3>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-lg font-semibold">
                              {item.price} euros
                            </div>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => removeWishlistItem(item.id)}
                            >
                              <TrashIcon className="w-5 h-5" />
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <AddItemDialog
                      onAddItem={(name, price) =>
                        handleAddWishlistItem(wishlist.id, name, price)
                      }
                    />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
          <Button
            size="lg"
            variant="outline"
            className="w-full"
            onClick={handleAddWishlist}
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Add New Wishlist
          </Button>
        </div>
      </div>
    </div>
  );
}
