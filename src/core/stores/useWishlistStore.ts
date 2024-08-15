import { create } from "zustand";
import {
  createWishlist,
  createWishlistItem,
  deleteWishlistItem,
  getWishlistsByUser,
  updateWishlist,
} from "../server/server-actions/wishlist";
import { Wishlist } from "../types/types.wishlist";

type WishlistStore = {
  wishlists: Wishlist[];
  isLoading: boolean;
  error: string | null;
  fetchWishlists: (userId: string) => Promise<void>;
  addWishlist: (userId: string, name: string, budget: number) => Promise<void>;
  addWishlistItem: (
    wishlistId: string,
    name: string,
    price: number,
    description: string,
    url?: string,
    category?: string,
  ) => Promise<Wishlist>;
  removeWishlistItem: (itemId: string) => Promise<void>;
  updateWishlistBudget: (
    wishlistId: string,
    newBudget: number,
  ) => Promise<void>;
  updateWishlistName: (wishlistId: string, newName: string) => Promise<void>;
};

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  wishlists: [],
  isLoading: false,
  error: null,

  fetchWishlists: async (userId: string): Promise<void> => {
    console.log("Fetching wishlists for user:", userId);
    set({ isLoading: true, error: null });
    try {
      const wishlists = await getWishlistsByUser(userId);
      console.log("Fetched wishlists:", wishlists);
      set({ wishlists, isLoading: false, error: null });
    } catch (error) {
      console.error("Error fetching wishlists:", error);
      set({ error: "Failed to fetch wishlists", isLoading: false });
    }
  },

  addWishlist: async (
    userId: string,
    name: string,
    budget: number,
  ): Promise<void> => {
    try {
      console.log("Adding new wishlist:", { userId, name, budget });
      const newWishlist = await createWishlist(userId, name, budget);
      console.log("New wishlist created:", newWishlist);

      // Fetch updated wishlists after adding
      const updatedWishlists = await getWishlistsByUser(userId);

      set((state) => ({
        wishlists: updatedWishlists,
        error: null,
      }));
    } catch (error) {
      console.error("Error adding wishlist:", error);
      set({ error: "Failed to add wishlist" });
    }
  },

  addWishlistItem: async (
    wishlistId: string,
    name: string,
    price: number,
    description: string,
    url?: string,
    category?: string,
  ): Promise<Wishlist> => {
    try {
      console.log("Adding new wishlist item:", {
        wishlistId,
        name,
        price,
        description,
        url,
        category,
      });
      const newItem = await createWishlistItem(
        wishlistId,
        name,
        price,
        description,
        url,
      );
      console.log("New item created:", newItem);

      const updatedWishlists = get().wishlists.map((wishlist) =>
        wishlist.id === wishlistId
          ? { ...wishlist, items: [...(wishlist.items || []), newItem] }
          : wishlist,
      );

      set({ wishlists: updatedWishlists, error: null });

      return updatedWishlists.find((w) => w.id === wishlistId) as Wishlist;
    } catch (error) {
      console.error("Error adding wishlist item:", error);
      set({ error: "Failed to add wishlist item" });
      throw error;
    }
  },

  removeWishlistItem: async (itemId: string): Promise<void> => {
    try {
      console.log("Removing wishlist item:", itemId);
      await deleteWishlistItem(itemId);
      console.log("Wishlist item removed successfully");

      const updatedWishlists = get().wishlists.map((wishlist) => ({
        ...wishlist,
        items: (wishlist.items || []).filter((item) => item.id !== itemId),
      }));

      set({ wishlists: updatedWishlists, error: null });
    } catch (error) {
      console.error("Error removing wishlist item:", error);
      set({ error: "Failed to remove wishlist item" });
    }
  },

  updateWishlistName: async (
    wishlistId: string,
    newName: string,
  ): Promise<void> => {
    try {
      console.log("Updating wishlist name:", { wishlistId, newName });
      await updateWishlist(wishlistId, { name: newName });
      console.log("Wishlist name updated successfully");

      const updatedWishlists = get().wishlists.map((wishlist) =>
        wishlist.id === wishlistId ? { ...wishlist, name: newName } : wishlist,
      );

      set({ wishlists: updatedWishlists, error: null });
    } catch (error) {
      console.error("Error updating wishlist name:", error);
      set({ error: "Failed to update wishlist name" });
    }
  },

  updateWishlistBudget: async (
    wishlistId: string,
    newBudget: number,
  ): Promise<void> => {
    try {
      console.log("Updating wishlist budget:", { wishlistId, newBudget });
      await updateWishlist(wishlistId, { budget: newBudget });
      console.log("Wishlist budget updated successfully");

      const updatedWishlists = get().wishlists.map((wishlist) =>
        wishlist.id === wishlistId
          ? { ...wishlist, budget: newBudget }
          : wishlist,
      );

      set({ wishlists: updatedWishlists, error: null });
    } catch (error) {
      console.error("Error updating wishlist budget:", error);
      set({ error: "Failed to update wishlist budget" });
    }
  },
}));
