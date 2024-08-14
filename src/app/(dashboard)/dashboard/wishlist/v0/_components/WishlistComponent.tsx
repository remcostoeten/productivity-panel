"use client";

import { Flex } from "@/components/atoms/Flex";
import { WishlistSkeleton } from "@/components/effect/skeleton-loaders";
import { Button, Card, CardContent, CardHeader } from "@/components/ui";
import { deleteWishlist } from "@/core/server/server-actions/wishlist";
import { useWishlistStore } from "@/core/stores/useWishlistStore";
import { WishlistItem } from "@/core/types/types.wishlist";
import PopoutForm from "@c/ui/PopoutForm";
import { AnimatePresence, motion } from "framer-motion";
import { Trash2Icon, TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { WishlistComponentProps } from "../v0.types";

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
    setLocalWishlists((prevWishlists) =>
      prevWishlists.map((wishlist) => {
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
      }),
    );

    try {
      await addWishlistItem(wishlistId, name, Number(price), description);
      toast.success("Item added successfully");
    } catch (error) {
      setLocalWishlists((prevWishlists) =>
        prevWishlists.map((wishlist) => {
          if (wishlist.id === wishlistId) {
            return {
              ...wishlist,
              items: wishlist.items.filter((item) => item.name !== name),
            };
          }
          return wishlist;
        }),
      );
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

  const handleRemoveSingleWishlistItem = async (
    wishlistId: string,
    itemId: string,
  ) => {
    try {
      await removeWishlistItem(itemId);
      setLocalWishlists((prev) =>
        prev.map((wishlist) => {
          if (wishlist.id === wishlistId) {
            return {
              ...wishlist,
              items: wishlist.items.filter((item) => item.id !== itemId),
            };
          }
          return wishlist;
        }),
      );
      toast.success("Item removed successfully");
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  if (isLoading) return <WishlistSkeleton />;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid gap-4">
        <div className="grid gap-6">
          <AnimatePresence>
            {localWishlists.map((wishlist) => (
              <motion.div
                key={wishlist.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.9 }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              >
                <Card className="hover:shadow-lg hover:shadow-[#ff6c00]/10 transition-shadow duration-700">
                  <CardHeader className="bg-[#161616] px-6 py-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold">{wishlist.name}</h2>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-neutral-400 hover:text-neutral-300"
                        onClick={() => removeEntireWishlist(wishlist.id)}
                      >
                        <Trash2Icon size={16} />
                      </Button>
                    </div>
                    <p className="text-muted-foreground">
                      Buget: €{wishlist.budget} .-
                    </p>
                  </CardHeader>
                  <CardContent className="bg-[#0c0c0c] px-6 py-4">
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
                              €{item.price}.-
                            </div>
                            <button
                              className="text-neutral-400 hover:text-neutral-300"
                              onClick={() =>
                                handleRemoveSingleWishlistItem(
                                  wishlist.id,
                                  item.id,
                                )
                              }
                            >
                              <TrashIcon size={16} />
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>{" "}
                    <Flex items="center" justify="between">
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
                          handleAddWishlistItem(wishlist.id, data)
                        }
                        defaultWidth={148}
                        defaultHeight={52}
                        expandedWidth={320}
                        expandedHeight={330}
                      />
                      <p className="text-muted-foreground">
                        Remaining:€
                        {wishlist.budget -
                          wishlist.items.reduce(
                            (total, item) => total + item.price,
                            0,
                            ",-",
                          )}{" "}
                        .-
                      </p>
                    </Flex>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
