"use server";

import { db } from "@/core/server/db";
import { v4 as uuidv4 } from "uuid";
import { wishlists } from "../db/schema";

export async function createWishlist(
  userId: string, 
  name: string, 
  budget: number
) {
  const id = uuidv4();
  await db
    .insert(wishlists)
    .values({ id, name, budget, userId });
}
