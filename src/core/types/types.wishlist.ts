export type  WishlistItem = {
  name: string;
  description: string;
  category: string;
  price: number;
  url: string;
}

export  type Wishlist = {
  name: string;
  budget: number;
  items: WishlistItem[];
}