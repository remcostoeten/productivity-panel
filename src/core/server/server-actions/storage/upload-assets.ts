"use server";


import { writeFile, unlink } from 'fs/promises';
import path from 'path';
import { db } from "@/core/server/db";
import { auth } from "@clerk/nextjs/server";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { assets, assetCategoryRelations, assetCategories } from '@/core/server/db/schema/relation-remodel';

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

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${generateUUID()}-${file.name}`;
  const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);

  await writeFile(filePath, buffer);

  const url = `/uploads/${fileName}`;
  const visibility = formData.get("visibility") as string || "private";
  const categoryIds = formData.getAll("categories") as string[];

  const asset = await db.transaction(async (tx) => {
    const newAsset = await tx
      .insert(assets)
      .values({
        id: generateUUID(),
        userId,
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        url,
        visibility,
      })
      .returning()
      .get();

    await Promise.all(
      categoryIds.map((categoryId) =>
        tx.insert(assetCategoryRelations).values({
          assetId: newAsset.id,
          categoryId,
        })
      )
    );

    return newAsset;
  });

  revalidatePath("/dashboard/assets");
  return asset;
}

export async function getAssets(page = 1, limit = 10, categoryId?: string, search?: string) {
  const { userId } = auth();
  if (!userId) throw new Error("Not authenticated");

  let query = db
    .select({
      asset: assets,
      categories: assetCategories,
    })
    .from(assets)
    .leftJoin(assetCategoryRelations, eq(assets.id, assetCategoryRelations.assetId))
    .leftJoin(assetCategories, eq(assetCategoryRelations.categoryId, assetCategories.id))
    .where(eq(assets.userId, userId));

  if (categoryId) {
    query = query.where(eq(assetCategoryRelations.categoryId, categoryId));
  }

  if (search) {
    query = query.where(sql`${assets.fileName} LIKE '%' || ${search} || '%'`);
  }

  const result = await query
    .orderBy(assets.createdAt)
    .limit(limit)
    .offset((page - 1) * limit);

  const totalCount = await db
    .select({ count: sql`count(*)` })
    .from(assets)
    .where(eq(assets.userId, userId))
    .get();

  return {
    assets: result.reduce((acc, { asset, categories }) => {
      const existingAsset = acc.find(a => a.id === asset.id);
      if (existingAsset) {
        if (categories) existingAsset.categories.push(categories);
      } else {
        acc.push({ ...asset, categories: categories ? [categories] : [] });
      }
      return acc;
    }, [] as any[]),
    totalCount: totalCount?.count || 0,
  };
}

export async function deleteAsset(id: string) {
  const { userId } = auth();
  if (!userId) throw new Error("Not authenticated");

  const asset = await db.select().from(assets).where(eq(assets.id, id)).get();
  if (asset && asset.userId === userId) {
    const filePath = path.join(process.cwd(), 'public', asset.url);
    await unlink(filePath);
    await db.delete(assetCategoryRelations).where(eq(assetCategoryRelations.assetId, id));
    await db.delete(assets).where(eq(assets.id, id));
    revalidatePath("/dashboard/assets");
  } else {
    throw new Error("Asset not found or you don't have permission to delete it");
  }
}

export async function getCategories() {
  return db.select().from(assetCategories);
}
