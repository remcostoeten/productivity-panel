"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createWishlistItem } from "@/core/server/server-actions/wishlist";
import toast from "react-hot-toast";

export default function WishlistItem({ wishlist }) {
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState(0);

  async function loadItems() {
    const res = await fetch(`/api/wishlist-items?wishlistId=${wishlist.id}`);
    const data = await res.json();
    setItems(data.items);
  }

  async function handleCreateItem(formData) {
    await createWishlistItem(
      formData.get("wishlistId"),
      formData.get("name"),
      Number(formData.get("price")),
    );

    toast({
      title: "Item added",
    });
  }

  return (
    <div className="border p-4">
      <h2 className="text-xl font-bold">{wishlist.name}</h2>
      <p>Budget: ${wishlist.budget}</p>

      <form action={handleCreateItem} className="flex gap-2 my-4">
        <input type="hidden" name="wishlistId" value={wishlist.id} />
        <Input
          name="name"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Item name"
        />
        <Input
          name="price"
          value={newItemPrice}
          onChange={(e) => setNewItemPrice(Number(e.target.value))}
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
