"use server";

import { db } from "@/core/server/db";
import { eq } from "drizzle-orm";
import { put, del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { assets } from "../../db/schema/relation-remodel";

function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export async function uploadAsset(formData: FormData) {
  const { userId } = auth();
  if (!userId) throw new Error("Not authenticated");

  const file = formData.get("file") as File;
  if (!file) throw new Error("No file provided");

  const buffer = await file.arrayBuffer();
  const fileName = `${generateUUID()}-${file.name}`;

  const { url } = await put(fileName, buffer, {
    access: "public",
  });

  const asset = await db
    .insert(assets)
    .values({
      id: generateUUID(),
      userId,
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      url,
    })
    .returning()
    .get();

  revalidatePath("/dashboard/assets");
  return asset;
}

export async function getAssets() {
  const { userId } = auth();
  if (!userId) throw new Error("Not authenticated");

  return await db
    .select()
    .from(assets)
    .where(eq(assets.userId, userId))
    .orderBy(assets.createdAt);
}

export async function deleteAsset(id: string) {
  const { userId } = auth();
  if (!userId) throw new Error("Not authenticated");

  const asset = await db.select().from(assets).where(eq(assets.id, id)).get();
  if (asset && asset.userId === userId) {
    await del(asset.url);
    await db.delete(assets).where(eq(assets.id, id));
    revalidatePath("/dashboard/assets");
  } else {
    throw new Error(
      "Asset not found or you don't have permission to delete it",
    );
  }
}
