"use client";

import { AnimatePulse } from "@/components/atoms/AnimatePulse";
import { Flex } from "@/components/atoms/Flex";
import Truncate from "@/components/atoms/Truncate";
import { WishlistSkeleton } from "@/components/effect/skeletons";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
} from "@/components/ui/";
import PopoutForm from "@/components/ui/PopoutForm";
import {
  delete_entire_wishlist,
  update_wishlist_item,
} from "@/core/server/server-actions/wishlist";
import { use_wishlist_store } from "@/core/stores/useWishlistStore";
import { WishlistItem } from "@/core/types/types.wishlist";
import { AnimatePresence, motion } from "framer-motion";
import { EditIcon, LinkIcon, Trash2Icon, TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function WishlistComponent({ user_id }: { user_id: string }) {
  const {
    wishlists,
    is_loading,
    error,
    fetch_wishlists,
    add_wishlist,
    add_wishlist_item,
    remove_wishlist_item,
    update_wishlist_name,
    update_wishlist_budget,
  } = use_wishlist_store();

  const [local_wishlists, set_local_wishlists] = useState([]);
  const [is_update_wishlist_modal_open, set_is_update_wishlist_modal_open] =
    useState(false);
  const [
    is_update_wishlist_item_modal_open,
    set_is_update_wishlist_item_modal_open,
  ] = useState(false);
  const [selected_wishlist_id, set_selected_wishlist_id] = useState<
    string | null
  >(null);
  const [new_name, set_new_name] = useState("");
  const [new_budget, set_new_budget] = useState("");
  const [selected_item_id, set_selected_item_id] = useState<string | null>(
    null,
  );
  const [new_item_name, set_new_item_name] = useState("");
  const [new_item_price, set_new_item_price] = useState("");
  const [new_item_description, set_new_item_description] = useState("");

  useEffect(() => {
    if (user_id) {
      fetch_wishlists(user_id);
    }
  }, [user_id, fetch_wishlists]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    const filtered_wishlists = wishlists.filter((wishlist) => wishlist != null);
    set_local_wishlists(filtered_wishlists);
  }, [wishlists]);

  const handle_add_wishlist = async (data: { name: string; budget: any }) => {
    try {
      await add_wishlist(user_id, data.name, Number(data.budget));
      await fetch_wishlists(user_id); // Fetch updated wishlists after adding
      toast.success("Wishlist added successfully");
    } catch (error) {
      toast.error("Failed to add wishlist");
    }
  };

  const handle_add_wishlist_item = async (
    wishlist_id: string,
    data: Record<string, string | string[]>,
  ) => {
    const { name, price, description, url } = data;

    try {
      await add_wishlist_item(
        wishlist_id,
        name as string,
        Number(price),
        description as string,
      );

      await fetch_wishlists(user_id);
      toast.success("Item added successfully");
    } catch (error) {
      toast.error("Failed to add item");
    }
  };

  const remove_entire_wishlist = async (wishlist_id: string) => {
    try {
      await delete_entire_wishlist(wishlist_id);
      set_local_wishlists((prev) =>
        prev.filter((wishlist) => wishlist && wishlist.id !== wishlist_id),
      );
      toast.success("Wishlist removed successfully");
    } catch (error) {
      toast.error("Failed to remove wishlist");
    }
  };

  const handle_remove_single_wishlist_item = async (
    wishlist_id: string,
    item_id: string,
  ) => {
    try {
      await remove_wishlist_item(item_id);
      set_local_wishlists((prev) =>
        prev.map((wishlist) => {
          if (wishlist && wishlist.id === wishlist_id) {
            return {
              ...wishlist,
              items: (wishlist.items || []).filter(
                (item) => item.id !== item_id,
              ),
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

  const handle_update_wishlist = async () => {
    if (selected_wishlist_id && (new_name || new_budget !== "")) {
      try {
        if (new_name) {
          await update_wishlist_name(selected_wishlist_id, new_name);
        }
        if (new_budget !== "") {
          await update_wishlist_budget(
            selected_wishlist_id,
            Number(new_budget),
          );
        }

        set_is_update_wishlist_modal_open(false);
        set_new_name("");
        set_new_budget("");
        set_selected_wishlist_id(null);
        toast.success("Wishlist updated successfully");

        await fetch_wishlists(user_id);
      } catch (error) {
        toast.error("Failed to update wishlist");
      }
    } else {
      toast.error("No changes to update or invalid wishlist selected");
    }
  };

  const handle_update_wishlist_item = async () => {
    if (
      !selected_item_id ||
      (!new_item_name && !new_item_price && !new_item_description)
    ) {
      toast.error("No changes to update or invalid item selected");
      return;
    }

    try {
      const update_data: Record<string, string | number> = {};
      if (new_item_name) update_data.name = new_item_name;
      if (new_item_price) update_data.price = Number(new_item_price);
      if (new_item_description) update_data.description = new_item_description;

      await update_wishlist_item(selected_item_id, update_data);
      await fetch_wishlists(user_id);
      toast.success("Item updated successfully");
      set_is_update_wishlist_item_modal_open(false);
      reset_item_update_form();
    } catch (error) {
      toast.error("Failed to update item");
    }
  };

  const reset_item_update_form = () => {
    set_selected_item_id(null);
    set_new_item_name("");
    set_new_item_price("");
    set_new_item_description("");
  };

  const remaining_color = (budget: number, total: number) => {
    const remaining = budget - total;
    if (remaining < 0) {
      return "text-error";
    } else if (remaining > 0 && remaining < budget / 4) {
      return "text-yellow-500";
    }
  };

  if (is_loading) return <WishlistSkeleton />;

  return (
    <div className="w-full max-w-4xl max-w-screen mx-auto">
      <div className="grid max-w-screen gap-4">
        <div className="grid gap-6 max-w-screen">
          <AnimatePresence>
            {local_wishlists.length === 0 ? (
              <p className="text-2xl">
                There are no lists yet! Get busy<AnimatePulse>✍️</AnimatePulse>
              </p>
            ) : null}
            {local_wishlists.map(
              (wishlist) =>
                wishlist && (
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
                        <div className="flex items-center justify-between gap-2">
                          <h2 className="text-lg font-semibold">
                            {wishlist.name}
                          </h2>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="text-neutral-400 hover:text-neutral-300"
                              onClick={() => {
                                set_selected_wishlist_id(wishlist.id);
                                set_is_update_wishlist_modal_open(true);
                              }}
                            >
                              <EditIcon />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              className="text-neutral-400 hover:text-neutral-300"
                              onClick={() =>
                                remove_entire_wishlist(wishlist.id)
                              }
                            >
                              <Trash2Icon size={16} />
                            </Button>
                          </div>
                        </div>
                        <p className="text-muted-foreground">
                          Budget: €{wishlist.budget?.toFixed(2) || "0.00"}.-
                        </p>
                      </CardHeader>
                      <CardContent className="bg-[#0c0c0c] px-6 py-4">
                        <ul className="grid gap-4">
                          {(wishlist.items || []).map((item: WishlistItem) => (
                            <li
                              key={item.id}
                              className="grid grid-cols-[1fr_auto] pb-4 border-b items-center gap-4"
                            >
                              <div className="grid gap-1">
                                <h3 className="font-medium">
                                  <Truncate text={item.name} chars="50" />
                                </h3>
                                {item.description ? (
                                  <p className="text-sm text-muted-foreground">
                                    <Truncate
                                      chars="100"
                                      text={item.description}
                                    />
                                  </p>
                                ) : null}
                                {item.url && (
                                  <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                                  >
                                    <LinkIcon size={16} />
                                    <span className="text-sm">
                                      {item.url.replace(/(^\w+:|^)\/\//, "")}
                                    </span>
                                  </a>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center justify-between flex-wrap text-wrap break-words">
                                  €{item.price}.-
                                </div>
                                <Flex gap="1">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="text-neutral-400 hover:text-neutral-300"
                                    onClick={() => {
                                      set_selected_item_id(item.id);
                                      set_new_item_name(item.name);
                                      set_new_item_price(item.price.toString());
                                      set_new_item_description(
                                        item.description || "",
                                      );
                                      set_is_update_wishlist_item_modal_open(
                                        true,
                                      );
                                    }}
                                  >
                                    <EditIcon />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="text-neutral-400 hover:text-neutral-300"
                                    onClick={() =>
                                      handle_remove_single_wishlist_item(
                                        wishlist.id,
                                        item.id,
                                      )
                                    }
                                  >
                                    <TrashIcon size={16} />
                                  </Button>
                                </Flex>
                              </div>
                            </li>
                          ))}
                        </ul>
                        <Flex items="center" justify="between" className="mt-4">
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
                              handle_add_wishlist_item(wishlist.id, data)
                            }
                            defaultWidth={148}
                            defaultHeight={52}
                            expandedWidth={320}
                            expandedHeight={320}
                          />
                          <p className="flex flex-col sm:block">
                            Remaining:
                            <span
                              className={remaining_color(
                                wishlist.budget,
                                (wishlist.items || []).reduce(
                                  (total, item) => total + (item.price || 0),
                                  0,
                                ),
                              )}
                            >
                              €
                              {(
                                wishlist.budget -
                                (wishlist.items || []).reduce(
                                  (total, item) => total + (item.price || 0),
                                  0,
                                )
                              ).toFixed(2)}
                              .-
                            </span>
                          </p>
                        </Flex>
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
            onSubmit={handle_add_wishlist}
            defaultWidth={156}
            defaultHeight={52}
            expandedWidth={320}
            expandedHeight={240}
          />
        </div>
      </div>
      <Dialog
        open={is_update_wishlist_item_modal_open}
        onOpenChange={(open) => {
          set_is_update_wishlist_item_modal_open(open);
          if (!open) reset_item_update_form();
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Wishlist Item</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new_item_name" className="text-right">
                New Name
              </Label>
              <Input
                id="new_item_name"
                value={new_item_name}
                onChange={(e) => set_new_item_name(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new_item_price" className="text-right">
                New Price
              </Label>
              <Input
                id="new_item_price"
                type="number"
                value={new_item_price}
                onChange={(e) => set_new_item_price(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new_item_description" className="text-right">
                New Description
              </Label>
              <Input
                id="new_item_description"
                value={new_item_description}
                onChange={(e) => set_new_item_description(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <Button onClick={handle_update_wishlist_item}>Update Item</Button>

          <Button
            variant="outline"
            onClick={() => set_is_update_wishlist_item_modal_open(false)}
          >
            Cancel
          </Button>
        </DialogContent>
      </Dialog>
      <Dialog
        open={is_update_wishlist_modal_open}
        onOpenChange={(open) => {
          set_is_update_wishlist_modal_open(open);
          if (!open) {
            set_new_name("");
            set_new_budget("");
            set_selected_wishlist_id(null);
          }
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Wishlist</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new_name" className="text-right">
                New Name
              </Label>
              <Input
                id="new_name"
                value={new_name}
                onChange={(e) => set_new_name(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new_budget" className="text-right">
                New Budget
              </Label>
              <Input
                id="new_budget"
                type="number"
                value={new_budget}
                onChange={(e) => set_new_budget(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <Button onClick={handle_update_wishlist}>Update Wishlist</Button>
          <Button
            variant="outline"
            onClick={() => set_is_update_wishlist_modal_open(false)}
          >
            Cancel
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
