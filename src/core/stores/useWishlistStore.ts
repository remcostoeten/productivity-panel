"use client";

import { create } from "zustand";
import {
  create_wishlist,
  create_wishlist_item,
  delete_wishlist_item,
  get_wishlists_by_user,
  update_wishlist,
  update_wishlist_item,
} from "../server/server-actions/wishlist";
import { Wishlist } from "../types/types.wishlist";

type WishlistStore = {
  wishlists: Wishlist[];
  is_loading: boolean;
  error: string | null;
  fetch_wishlists: (user_id: string) => Promise<void>;
  add_wishlist: (
    user_id: string,
    name: string,
    budget: number,
  ) => Promise<void>;
  add_wishlist_item: (
    wishlist_id: string,
    name: string,
    price: number,
    description: string,
    url?: string,
    category?: string,
  ) => Promise<Wishlist>;
  remove_wishlist_item: (item_id: string) => Promise<void>;
  update_wishlist_budget: (
    wishlist_id: string,
    new_budget: number,
  ) => Promise<void>;
  update_wishlist_name: (
    wishlist_id: string,
    new_name: string,
  ) => Promise<void>;
  update_wishlist_item: (
    item_id: string,
    name: string,
    price: number,
    description: string,
    url?: string,
    category?: string,
  ) => Promise<void>;
};

export const use_wishlist_store = create<WishlistStore>((set, get) => ({
  wishlists: [],
  is_loading: false,
  error: null,

  fetch_wishlists: async (user_id: string): Promise<void> => {
    console.log("Fetching wishlists for user:", user_id);
    set({ is_loading: true, error: null });
    try {
      const wishlists = await get_wishlists_by_user(user_id);
      console.log("Fetched wishlists:", wishlists);
      set({ wishlists, is_loading: false, error: null });
    } catch (error) {
      console.error("Error fetching wishlists:", error);
      set({ error: "Failed to fetch wishlists", is_loading: false });
    }
  },

  update_wishlist_item: async (
    item_id: string,
    name: string,
    price: number,
    description: string,
    url?: string,
    category?: string,
  ): Promise<void> => {
    try {
      console.log("Updating wishlist item:", {
        item_id,
        name,
        price,
        description,
        url,
        category,
      });
      await update_wishlist_item(item_id, { name, price, description, url });
      console.log("Wishlist item updated successfully");

      const updated_wishlists = get().wishlists.map((wishlist) => ({
        ...wishlist,
        items: (wishlist.items || []).map((item) =>
          item.id === item_id
            ? { ...item, name, price, description, url }
            : item,
        ),
      }));

      set({ wishlists: updated_wishlists, error: null });
    } catch (error) {
      console.error("Error updating wishlist item:", error);
      set({ error: "Failed to update wishlist item" });
    }
  },

  add_wishlist: async (
    user_id: string,
    name: string,
    budget: number,
  ): Promise<void> => {
    try {
      console.log("Adding new wishlist:", { user_id, name, budget });
      const new_wishlist = await create_wishlist(user_id, name, budget);
      console.log("New wishlist created:", new_wishlist);

      // Fetch updated wishlists after adding
      const updated_wishlists = await get_wishlists_by_user(user_id);

      set((state) => ({
        wishlists: updated_wishlists,
        error: null,
      }));
    } catch (error) {
      console.error("Error adding wishlist:", error);
      set({ error: "Failed to add wishlist" });
    }
  },

  add_wishlist_item: async (
    wishlist_id: string,
    name: string,
    price: number,
    description: string,
    url?: string,
    category?: string,
  ): Promise<Wishlist> => {
    try {
      console.log("Adding new wishlist item:", {
        wishlist_id,
        name,
        price,
        description,
        url,
        category,
      });
      const new_item = await create_wishlist_item(
        wishlist_id,
        name,
        price,
        description,
        url,
      );
      console.log("New item created:", new_item);

      const updated_wishlists = get().wishlists.map((wishlist) =>
        wishlist.id === wishlist_id
          ? { ...wishlist, items: [...(wishlist.items || []), new_item] }
          : wishlist,
      );

      set({ wishlists: updated_wishlists, error: null });

      return updated_wishlists.find((w) => w.id === wishlist_id) as Wishlist;
    } catch (error) {
      console.error("Error adding wishlist item:", error);
      set({ error: "Failed to add wishlist item" });
      throw error;
    }
  },

  remove_wishlist_item: async (item_id: string): Promise<void> => {
    try {
      console.log("Removing wishlist item:", item_id);
      await delete_wishlist_item(item_id);
      console.log("Wishlist item removed successfully");

      const updated_wishlists = get().wishlists.map((wishlist) => ({
        ...wishlist,
        items: (wishlist.items || []).filter((item) => item.id !== item_id),
      }));

      set({ wishlists: updated_wishlists, error: null });
    } catch (error) {
      console.error("Error removing wishlist item:", error);
      set({ error: "Failed to remove wishlist item" });
    }
  },

  update_wishlist_name: async (
    wishlist_id: string,
    new_name: string,
  ): Promise<void> => {
    try {
      console.log("Updating wishlist name:", { wishlist_id, new_name });
      await update_wishlist(wishlist_id, { name: new_name });
      console.log("Wishlist name updated successfully");

      const updated_wishlists = get().wishlists.map((wishlist) =>
        wishlist.id === wishlist_id
          ? { ...wishlist, name: new_name }
          : wishlist,
      );

      set({ wishlists: updated_wishlists, error: null });
    } catch (error) {
      console.error("Error updating wishlist name:", error);
      set({ error: "Failed to update wishlist name" });
    }
  },

  update_wishlist_budget: async (
    wishlist_id: string,
    new_budget: number,
  ): Promise<void> => {
    try {
      console.log("Updating wishlist budget:", { wishlist_id, new_budget });
      await update_wishlist(wishlist_id, { budget: new_budget });
      console.log("Wishlist budget updated successfully");

      const updated_wishlists = get().wishlists.map((wishlist) =>
        wishlist.id === wishlist_id
          ? { ...wishlist, budget: new_budget }
          : wishlist,
      );

      set({ wishlists: updated_wishlists, error: null });
    } catch (error) {
      console.error("Error updating wishlist budget:", error);
      set({ error: "Failed to update wishlist budget" });
    }
  },
}));
