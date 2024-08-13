"use client";

import React, { useState } from "react";
import {
  Button,
  Input,
  Label,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";
import { PlusIcon, TrashIcon } from "lucide-react";
import { Wishlist, WishlistItem } from "@/core/types/types.wishlist";

export default function Component() {
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [newWishlistName, setNewWishlistName] = useState("");
  const [newWishlistBudget, setNewWishlistBudget] = useState("");
  const [newItem, setNewItem] = useState<WishlistItem>({
    name: "",
    description: "",
    category: "",
    price: 0,
    url: "",
  });
  const [selectedWishlistIndex, setSelectedWishlistIndex] = useState<
    number | null
  >(null);

  const addWishlist = () => {
    if (newWishlistName && newWishlistBudget) {
      setWishlists([
        ...wishlists,
        {
          name: newWishlistName,
          budget: parseFloat(newWishlistBudget),
          items: [],
        },
      ]);
      setNewWishlistName("");
      setNewWishlistBudget("");
    }
  };

  const addItemToWishlist = () => {
    if (selectedWishlistIndex !== null && newItem.name && newItem.price) {
      const updatedWishlists = [...wishlists];
      updatedWishlists[selectedWishlistIndex].items.push(newItem);
      setWishlists(updatedWishlists);
      setNewItem({
        name: "",
        description: "",
        category: "",
        price: 0,
        url: "",
      });
      setSelectedWishlistIndex(null);
    }
  };

  const removeItemFromWishlist = (wishlistIndex: number, itemIndex: number) => {
    const updatedWishlists = [...wishlists];
    updatedWishlists[wishlistIndex].items.splice(itemIndex, 1);
    setWishlists(updatedWishlists);
  };

  const calculateTotal = (items: WishlistItem[]) => {
    return items.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Wishlist Manager</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Create New Wishlist</h2>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Wishlist Name"
            value={newWishlistName}
            onChange={(e) => setNewWishlistName(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Budget"
            value={newWishlistBudget}
            onChange={(e) => setNewWishlistBudget(e.target.value)}
          />
          <Button onClick={addWishlist}>Create Wishlist</Button>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-2">Your Wishlists</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {wishlists.map((wishlist, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{wishlist.name}</CardTitle>
              <CardDescription>
                Budget: ${wishlist.budget.toFixed(2)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Items: {wishlist.items.length}</p>
              <p>Total: ${calculateTotal(wishlist.items).toFixed(2)}</p>
              <p
                className={
                  calculateTotal(wishlist.items) > wishlist.budget
                    ? "text-red-500"
                    : "text-green-500"
                }
              >
                {calculateTotal(wishlist.items) > wishlist.budget
                  ? "Over Budget"
                  : "Under Budget"}
              </p>
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button onClick={() => setSelectedWishlistIndex(index)}>
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Create Item
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Item to {wishlist.name}</DialogTitle>
                    <DialogDescription>
                      Fill in the details of the new item for your wishlist.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        className="col-span-3"
                        value={newItem.name}
                        onChange={(e) =>
                          setNewItem({ ...newItem, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Input
                        id="description"
                        className="col-span-3"
                        value={newItem.description}
                        onChange={(e) =>
                          setNewItem({
                            ...newItem,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="category" className="text-right">
                        Category
                      </Label>
                      <Input
                        id="category"
                        className="col-span-3"
                        value={newItem.category}
                        onChange={(e) =>
                          setNewItem({ ...newItem, category: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="price" className="text-right">
                        Price
                      </Label>
                      <Input
                        id="price"
                        type="number"
                        className="col-span-3"
                        value={newItem.price || ""}
                        onChange={(e) =>
                          setNewItem({
                            ...newItem,
                            price: parseFloat(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="url" className="text-right">
                        URL
                      </Label>
                      <Input
                        id="url"
                        className="col-span-3"
                        value={newItem.url}
                        onChange={(e) =>
                          setNewItem({ ...newItem, url: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={addItemToWishlist}>Add Item</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>

      {wishlists.map((wishlist, wishlistIndex) => (
        <Card key={wishlistIndex} className="mt-8">
          <CardHeader>
            <CardTitle>{wishlist.name}</CardTitle>
            <CardDescription>
              Budget: ${wishlist.budget.toFixed(2)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-semibold mb-2">Items</h3>
            <ul className="space-y-2">
              {wishlist.items.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div>
                    <span className="font-semibold">{item.name}</span> - $
                    {item.price.toFixed(2)}
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <p className="text-sm text-gray-600">
                      Category: {item.category}
                    </p>
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-500 hover:underline"
                      >
                        View Item
                      </a>
                    )}
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() =>
                      removeItemFromWishlist(wishlistIndex, itemIndex)
                    }
                  >
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <div className="w-full">
              <p className="text-lg font-semibold">
                Total: ${calculateTotal(wishlist.items).toFixed(2)}
              </p>
              <p
                className={`text-lg ${calculateTotal(wishlist.items) > wishlist.budget ? "text-red-500" : "text-green-500"}`}
              >
                {calculateTotal(wishlist.items) > wishlist.budget
                  ? "Over Budget"
                  : "Under Budget"}
              </p>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
