"use server";

import { db } from "@/core/server/db";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { v4 as uuidv4 } from "uuid";
import { users, wishlist_items, wishlists } from "../db/schema";

export async function delete_wishlist_item(item_id: string) {
  await db.delete(wishlist_items).where(eq(wishlist_items.id, item_id));
}

export async function delete_entire_wishlist(wishlist_id: string) {
  await db
    .delete(wishlist_items)
    .where(eq(wishlist_items.wishlist_id, wishlist_id));
  await db.delete(wishlists).where(eq(wishlists.id, wishlist_id));
}

export async function create_wishlist(
  user_id: string,
  name: string,
  budget: number,
) {
  try {
    const user_results = await db
      .select()
      .from(users)
      .where(eq(users.id, user_id));
    if (user_results.length === 0) {
      throw new Error("User not found");
    }

    const id = uuidv4();
    await db.insert(wishlists).values({ id, name, budget, user_id });

    return { success: true, id };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to create wishlist: ${error.message}`);
    } else {
      throw new Error("Failed to create wishlist: Unknown error");
    }
  }
}

export async function get_wishlists_by_user(user_id: string) {
  const result = await db
    .select({
      wishlist_id: wishlists.id,
      wishlist_name: wishlists.name,
      wishlist_budget: wishlists.budget,
      item_id: wishlist_items.id,
      item_name: wishlist_items.name,
      item_price: wishlist_items.price,
      item_description: wishlist_items.description,
    })
    .from(wishlists)
    .leftJoin(wishlist_items, eq(wishlists.id, wishlist_items.wishlist_id))
    .where(eq(wishlists.user_id, user_id));

  return result.reduce((acc, curr) => {
    const wishlist = acc.find((w) => w.id === curr.wishlist_id);
    if (wishlist) {
      if (curr.item_id) {
        wishlist.items.push({
          id: curr.item_id,
          name: curr.item_name,
          price: curr.item_price,
          description: curr.item_description,
        });
      }
    } else {
      acc.push({
        id: curr.wishlist_id,
        name: curr.wishlist_name,
        budget: curr.wishlist_budget,
        items: curr.item_id
          ? [
              {
                id: curr.item_id,
                name: curr.item_name,
                price: curr.item_price,
                description: curr.item_description,
              },
            ]
          : [],
      });
    }
    return acc;
  }, []);
}

export async function create_wishlist_item(
  wishlist_id: string,
  name: string,
  price: number,
  description: string,
  category: string,
) {
  const new_item = {
    id: nanoid(),
    name,
    price,
    description,
    category,
    wishlist_id,
  };

  await db.insert(wishlist_items).values(new_item);
  return new_item;
}

export async function get_wishlist_items_by_wishlist(wishlist_id: string) {
  return await db
    .select()
    .from(wishlist_items)
    .where(eq(wishlist_items.wishlist_id, wishlist_id));
}

export async function update_wishlist(
  wishlist_id: string,
  updates: Partial<typeof wishlists.$inferInsert> & { updated_at?: number },
) {
  await db.update(wishlists).set(updates).where(eq(wishlists.id, wishlist_id));
}

export async function update_wishlist_item(
  item_id: string,
  update_data: Partial<{
    name: string;
    price: number;
    description: string;
    url: string;
    category: string;
  }>,
) {
  try {
    await db
      .update(wishlist_items)
      .set({ ...update_data, updated_at: Math.floor(Date.now() / 1000) })
      .where(eq(wishlist_items.id, item_id));

    return { success: true };
  } catch (error) {
    console.error("Error updating wishlist item:", error);
    return { success: false, error: "Failed to update wishlist item" };
  }
}

export async function update_wishlist_name(
  wishlist_id: string,
  new_name: string,
) {
  await update_wishlist(wishlist_id, { name: new_name });
}
