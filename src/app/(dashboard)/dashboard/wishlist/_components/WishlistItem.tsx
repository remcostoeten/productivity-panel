"use client";

import React, { useState } from "react";
import { createWishlist } from "@/core/server/server-actions/wishlist";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

export default function CreateWishlist({ userId, onWishlistCreated }) {
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await createWishlist(userId, name, parseFloat(budget));
      if (result.success) {
        toast({
          title: "Success",
          description: "Wishlist created successfully",
        });
        setName("");
        setBudget("");
        if (onWishlistCreated) onWishlistCreated(result.id);
      }
    } catch (error) {
      console.error("Error creating wishlist:", error);
      toast({
        title: "Error",
        description:
          error.message || "Failed to create wishlist. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Wishlist name"
        required
        disabled={isLoading}
      />
      <Input
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        placeholder="Budget"
        type="number"
        required
        disabled={isLoading}
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Creating..." : "Create Wishlist"}
      </Button>
    </form>
  );
}
