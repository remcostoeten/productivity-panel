'use client'

import { create } from 'zustand';
import { Wishlist } from '../types/types.wishlist';
import { getWishlistsByUser, createWishlist, createWishlistItem, deleteWishlistItem } from '../server/server-actions/wishlist';

type WishlistStore = {
    wishlists: Wishlist[];
    isLoading: boolean;
    error: string | null;
    fetchWishlists: (userId: string) => Promise<void>;
    addWishlist: (userId: string, name: string, budget: number) => Promise<void>;
    addWishlistItem: (wishlistId: string, name: string, price: number) => Promise<void>;
    removeWishlistItem: (itemId: string) => Promise<void>;
};

export const useWishlistStore = create<WishlistStore>((set, get) => ({
    wishlists: [],
    isLoading: false,
    error: null,
    fetchWishlists: async (userId: string): Promise<void> => {
        set({ isLoading: true, error: null });
        try {
            const wishlists: Wishlist[] = await getWishlistsByUser(userId);
            set({ wishlists, isLoading: false });
        } catch (error) {
            set({ error: 'Failed to fetch wishlists', isLoading: false });
        }
    },
    addWishlist: async (userId: string, name: string, budget: number): Promise<void> => {
        try {
            await createWishlist(userId, name, budget);
            await get().fetchWishlists(userId);
        } catch (error) {
            set({ error: 'Failed to add wishlist' });
        }
    },
    addWishlistItem: async (wishlistId: string, name: string, price: number): Promise<void> => {
        try {
            await createWishlistItem(wishlistId, name, price);
            const userId = get().wishlists[0]?.userId; // Assuming all wishlists belong to the same user
            if (userId) {
                await get().fetchWishlists(userId);
            }
        } catch (error) {
            set({ error: 'Failed to add wishlist item' });
        }
    },
    removeWishlistItem: async (itemId: string): Promise<void> => {
        try {
            await deleteWishlistItem(itemId);
            const userId = get().wishlists[0]?.userId;
            if (userId) {
                await get().fetchWishlists(userId);
            }
        } catch (error) {
            set({ error: 'Failed to remove wishlist item' });
        }
    },
}));
