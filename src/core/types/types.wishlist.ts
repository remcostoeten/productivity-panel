export type Wishlist = {
  id: string;
  name: string;
  budget: number;
  userId: string;
  items: WishlistItem[];
};

export type WishlistItem = {
  id: string;
  name: string;
  price: number;
  description?: string;
  url?: string;
  category?: string;
};
