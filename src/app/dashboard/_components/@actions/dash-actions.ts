"use server"

import { generateId } from "@/core/helpers/generate-id"
import { db } from "@/core/server/db"
import { folders, notes, sharedNotes, tags } from "@/core/server/db/schema/notes"
import { auth } from "@clerk/nextjs/server"
import { and, desc, eq, sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function getStats() {
    const { userId } = auth()

    if (!userId) {
        throw new Error("Unauthorized")
    }

    try {
        const [notesCount, foldersCount, tagsCount, sharedNotesCount] = await Promise.all([
            db.select({ count: sql<number>`count(*)` }).from(notes).where(eq(notes.userId, userId)),
            db.select({ count: sql<number>`count(*)` }).from(folders).where(eq(folders.userId, userId)),
            db.select({ count: sql<number>`count(*)` }).from(tags).where(eq(tags.userId, userId)),
            db.select({ count: sql<number>`count(*)` }).from(sharedNotes).where(eq(sharedNotes.sharedWithUserId, userId)),
        ])

        return {
            totalNotes: notesCount[0].count,
            folderCount: foldersCount[0].count,
            tagCount: tagsCount[0].count,
            sharedNotes: sharedNotesCount[0].count,
        }
    } catch (error) {
        console.error("Failed to fetch stats:", error)
        throw new Error("Failed to fetch stats")
    }
}

export async function getFolders() {
    const { userId } = auth()

    if (!userId) {
        throw new Error("Unauthorized")
    }

    try {
        return await db.select().from(folders).where(eq(folders.userId, userId))
    } catch (error) {
        console.error("Failed to fetch folders:", error)
        throw new Error("Failed to fetch folders")
    }
}

export async function getAllNotes(folderId?: string) {
    const { userId } = auth()

    if (!userId) {
        throw new Error("Unauthorized")
    }

    try {
        let query = db
            .select()
            .from(notes)
            .where(eq(notes.userId, userId))
            .orderBy(desc(notes.updatedAt))

        if (folderId) {
            query = query.where(and(eq(notes.userId, userId), eq(notes.folderId, folderId)))
        }

        return await query
    } catch (error) {
        console.error("Failed to fetch notes:", error)
        throw new Error("Failed to fetch notes")
    }
}

export async function createFolder(formData: FormData) {
    const name = formData.get('folderName') as string
    const { userId } = auth()

    if (!userId) {
        throw new Error("Unauthorized")
    }

    if (!name) {
        throw new Error("Folder name is required")
    }

    try {
        const newFolder = await db
            .insert(folders)
            .values({
                id: generateId("folder"),
                userId,
                name,
            })
            .returning()

        revalidatePath("/dashboard")
        return newFolder[0]
    } catch (error) {
        console.error("Failed to create folder:", error)
        throw new Error("Failed to create folder")
    }
}

export async function createNote(userId: string, title: string, content: string, folderId: string | null) {
    if (!userId) {
        throw new Error("Unauthorized")
    }

    try {
        const newNote = await db
            .insert(notes)
            .values({
                id: generateId("note"),
                userId,
                title,
                content,
                folderId,
            })
            .returning()

        revalidatePath("/dashboard")
        return newNote[0]
    } catch (error) {
        console.error("Failed to create note:", error)
        throw new Error("Failed to create note")
    }
}

export async function deleteFolder(folderId: string) {
    const { userId } = auth()

    if (!userId) {
        throw new Error("Unauthorized")
    }

    try {
        await db.transaction(async (tx) => {
            // Move all notes in this folder to have no folder
            await tx
                .update(notes)
                .set({ folderId: null })
                .where(eq(notes.folderId, folderId))

            // Recursively delete all sub-folders
            await deleteSubFolders(tx, folderId)

            // Delete the folder itself
            await tx.delete(folders).where(eq(folders.id, folderId))
        })

        revalidatePath("/dashboard")
    } catch (error) {
        console.error("Failed to delete folder:", error)
        throw new Error("Failed to delete folder")
    }
}

export async function updateFolder(folderId: string, name: string) {
    const { userId } = auth()

    if (!userId) {
        throw new Error("Unauthorized")
    }

    try {
        await db.update(folders).set({ name }).where(eq(folders.id, folderId))
        revalidatePath("/dashboard")
    } catch (error) {
        console.error("Failed to update folder:", error)
        throw new Error("Failed to update folder")
    }
}

async function deleteSubFolders(tx: any, parentId: string) {
    const subFolders = await tx
        .select({ id: folders.id })
        .from(folders)
        .where(eq(folders.parentId, parentId))

    for (const subFolder of subFolders) {
        // Move notes in sub-folder to have no folder
        await tx
            .update(notes)
            .set({ folderId: null })
            .where(eq(notes.folderId, subFolder.id))

        // Recursively delete sub-sub-folders
        await deleteSubFolders(tx, subFolder.id)

        // Delete the sub-folder
        await tx.delete(folders).where(eq(folders.id, subFolder.id))
    }
}
