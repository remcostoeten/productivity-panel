"use client";

import { Card, CardHeader, CardContent } from "@/components/ui";
import { toast } from "react-hot-toast";
import { WishlistComponentProps } from "../v0.types";
import { useWishlistStore } from "@/core/stores/useWishlistStore";
import { TrashIcon, Trash2Icon } from "lucide-react";
import { WishlistItem } from "@/core/types/types.wishlist";
import { deleteWishlist } from "@/core/server/server-actions/wishlist";
import { motion, AnimatePresence } from "framer-motion";
import PopoutForm from "@c/ui/PopoutForm";
import { useState, useEffect } from "react";

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
    if (wishlists.length === 0) {
      toast("No wishlists available. Add a new wishlist to get started.");
    }
  }, [wishlists]);

  const handleAddWishlist = async (data: Record<string, string>) => {
    try {
      await addWishlist(userId, data.name, Number(data.budget));
      toast.success("Wishlist added successfully");
    } catch (error) {
      toast.error("Failed to add wishlist");
    }
  };

  const handleAddWishlistItem = async (
    wishlistId: string,
    data: Record<string, string>,
  ) => {
    const { name, price, description } = data;
    setLocalWishlists((prevWishlists: any[]) => {
      return prevWishlists.map((wishlist: { id: string; items: any }) => {
        if (wishlist.id === wishlistId) {
          return {
            ...wishlist,
            items: [
              ...wishlist.items,
              {
                id: Date.now().toString(),
                name,
                price: Number(price),
                description,
              },
            ],
          };
        }
        return wishlist;
      });
    });

    try {
      await addWishlistItem(wishlistId, name, Number(price), description);
      toast.success("Item added successfully");
    } catch (error) {
      setLocalWishlists((prevWishlists: any[]) => {
        return prevWishlists.map((wishlist: { id: string; items: any[] }) => {
          if (wishlist.id === wishlistId) {
            return {
              ...wishlist,
              items: wishlist.items.filter(
                (item: { name: string }) => item.name !== name,
              ),
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
      setLocalWishlists((prev: any[]) =>
        prev.filter((wishlist: { id: string }) => wishlist.id !== wishlistId),
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
            {localWishlists.map(
              (wishlist: {
                id: React.Key;
                name: string;
                budget: number;
                items: WishlistItem[];
              }) => (
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
                        <h2 className="text-lg font-semibold">
                          {wishlist.name}
                        </h2>
                        <button
                          className="text-neutral-400 hover:text-neutral-300"
                          onClick={() =>
                            removeEntireWishlist(wishlist.id as string)
                          }
                        >
                          <Trash2Icon size={20} />
                        </button>
                      </div>
                      <p className="text-muted-foreground">
                        Budget: {wishlist.budget} euros
                      </p>
                    </CardHeader>
                    <CardContent className="px-6 py-4">
                      <ul className="grid gap-4">
                        {wishlist.items.map((item: WishlistItem) => (
                          <li
                            key={item.id}
                            className="grid grid-cols-[1fr_auto] items-center gap-4"
                          >
                            <div className="grid gap-1">
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {item.description}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="text-lg font-semibold">
                                {item.price} euros
                              </div>
                              <button
                                className="text-neutral-400 hover:text-neutral-300"
                                onClick={() =>
                                  removeWishlistItem(
                                    wishlist.id as string,
                                    item.id,
                                  )
                                }
                              >
                                <TrashIcon size={16} />
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <PopoutForm
                        label="Add Item"
                        fields={[
                          {
                            type: "text",
                            name: "name",
                            placeholder: "Item Name",
                          },
                          {
                            type: "number",
                            name: "price",
                            placeholder: "Price",
                            prefix: "€",
                          },
                          {
                            type: "textarea",
                            name: "description",
                            placeholder: "Description",
                          },
                        ]}
                        onSubmit={(data) =>
                          handleAddWishlistItem(wishlist.id as string, data)
                        }
                        defaultWidth={148}
                        defaultHeight={52}
                        expandedWidth={320}
                        expandedHeight={300}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              ),
            )}
          </AnimatePresence>
          <PopoutForm
            label="Add Wishlist"
            fields={[
              { type: "text", name: "name", placeholder: "Wishlist Name" },
              {
                type: "number",
                name: "budget",
                placeholder: "Budget",
                prefix: "€",
              },
            ]}
            onSubmit={handleAddWishlist}
            defaultWidth={156}
            defaultHeight={52}
            expandedWidth={320}
            expandedHeight={240}
          />
        </div>
      </div>
    </div>
  );
}
