"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import {
  createWishlistItem,
  getWishlistItemsByWishlist,
} from "@/core/server/server-actions/wishlist";

export default function WishlistItem({ wishlist }) {
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState(0);

  useEffect(() => {
    loadItems();
  }, [wishlist.id]);

  async function loadItems() {
    const items = await getWishlistItemsByWishlist(wishlist.id);
    setItems(items);
  }

  async function handleCreateItem(e) {
    e.preventDefault();

    await createWishlistItem(wishlist.id, newItemName, newItemPrice);

    setNewItemName("");
    setNewItemPrice(0);

    toast({
      title: "Item added",
    });

    loadItems();
  }

  return (
    <div className="border p-4">
      <h2 className="text-xl font-bold">{wishlist.name}</h2>
      <p>Budget: ${wishlist.budget}</p>

      <form onSubmit={handleCreateItem} className="flex gap-2 my-4">
        <Input
          value={newItemName}
          onChange={(e: { target: { value: any } }) =>
            setNewItemName(e.target.value)
          }
          placeholder="Item name"
        />
        <Input
          value={newItemPrice}
          onChange={(e: { target: { value: any } }) =>
            setNewItemPrice(Number(e.target.value))
          }
          placeholder="Price"
          type="number"
        />
        <Button type="submit">Add Item</Button>
      </form>

      <Button onClick={loadItems}>Refresh Items</Button>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
