import { create } from "zustand";
import {
  getWishlistsByUserId,
  getItemsByWishlistId,
  addItemToWishlist,
  updateWishlistItem,
  deleteWishlistItem,
  createWishlist,
} from "../server/server-actions/ wishlistActions";

export type Wishlist = {
  id: string;
  title: string;
  description: string;
  budget: number;
  dateCreated: string;
};

export type WishlistItem = {
  id: string;
  wishlistId: string;
  name: string;
  price: number;
  description: string;
  link: string;
  category: string;
  tags: string;
  dateAdded: string;
};

interface WishlistStore {
  wishlists: Wishlist[];
  selectedWishlist: Wishlist | null;
  items: WishlistItem[];
  setSelectedWishlist: (wishlist: Wishlist) => void;
  fetchWishlists: () => Promise<void>;
  fetchWishlistItems: (wishlistId: string) => Promise<void>;
  addItem: (
    wishlistId: string,
    newItem: Omit<WishlistItem, "id" | "wishlistId" | "dateAdded">,
  ) => Promise<void>;
  updateItem: (itemId: string, updates: Partial<WishlistItem>) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  createNewWishlist: (
    title: string,
    description: string,
    budget: number,
  ) => Promise<void>;
}

const useWishlistStore = create<WishlistStore>((set) => ({
  wishlists: [],
  selectedWishlist: null,
  items: [],
  setSelectedWishlist: (wishlist) => set({ selectedWishlist: wishlist }),
  fetchWishlists: async () => {
    const wishlists = await getWishlistsByUserId();
    set({ wishlists });
  },
  fetchWishlistItems: async (wishlistId) => {
    const items = await getItemsByWishlistId(wishlistId);
    set({ items });
  },
  addItem: async (wishlistId, newItem) => {
    const addedItem = await addItemToWishlist(
      wishlistId,
      newItem.name,
      newItem.price,
      newItem.description,
      newItem.link,
      newItem.category,
      newItem.tags,
    );
    set((state) => ({ items: [addedItem, ...state.items] }));
  },
  updateItem: async (itemId, updates) => {
    const updatedItem = await updateWishlistItem(itemId, updates);
    set((state) => ({
      items: state.items.map((item) =>
        item.id === itemId ? updatedItem : item,
      ),
    }));
  },
  removeItem: async (itemId) => {
    await deleteWishlistItem(itemId);
    set((state) => ({
      items: state.items.filter((item) => item.id !== itemId),
    }));
  },
  createNewWishlist: async (title, description, budget) => {
    const newWishlist = await createWishlist(title, description, budget);
    set((state) => ({ wishlists: [...state.wishlists, newWishlist] }));
  },
}));

export default useWishlistStore;
