import { ReactKey } from 'react';

export type WishlistItem = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  url: string;
};


export type Wishlist = {
    id: ReactKey;
    name: string;
    budget: number;
    remainingBudget: number;
    items: WishlistItem[];
};
