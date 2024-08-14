import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast, { Toaster } from "react-hot-toast";
import {
  createWishlistItem,
  getWishlistItemsByWishlist,
  deleteWishlistItem,
} from "@/core/server/server-actions/wishlist";
import { PlusIcon, Trash2Icon } from "lucide-react";

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

  async function handleCreateItem(e: { preventDefault: () => void }) {
    e.preventDefault();

    await createWishlistItem(wishlist.id, newItemName, newItemPrice);

    setNewItemName("");
    setNewItemPrice(0);

    toast.success("Item added");

    loadItems();
  }

  async function handleDeleteItem(itemId: string) {
    await deleteWishlistItem(itemId);
    toast.success("Item deleted");
    loadItems();
  }

  const totalCost = items.reduce(
    (acc: any, item: { price: any }) => acc + item.price,
    0,
  );
  const remainingBudget = wishlist.budget - totalCost;

  return (
    <div className="border p-4">
      <Toaster />
      <h2 className="text-xl font-bold">{wishlist.name}</h2>
      <p>Budget: ${wishlist.budget}</p>
      <p>Remaining Budget: ${remainingBudget}</p>

      <form onSubmit={handleCreateItem} className="flex gap-2 my-4">
        <Input
          value={newItemName}
          onChange={(e: { target: { value: any } }) =>
            setNewItemName(e.target.value)
          }
          placeholder="Item name"
        />
        <div className="flex items-center">
          <span className="mr-1">€</span>
          <Input
            value={newItemPrice}
            onChange={(e: { target: { value: any } }) =>
              setNewItemPrice(Number(e.target.value))
            }
            placeholder="Price"
            type="number"
            className="w-20"
          />
        </div>
        <Button size="sm" variant="outline" type="submit">
          <PlusIcon />
        </Button>
      </form>

      <ul>
        {items.map((item: { id: any; name: any; price: any }) => (
          <li key={item.id} className="flex justify-between items-center">
            <span>
              {item.name} - ${item.price}
            </span>
            <Button
              size="icon"
              variant="outline"
              onClick={() => handleDeleteItem(item.id)}
            >
              <Trash2Icon />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
