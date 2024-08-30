import { db } from "@/core/server/db";
import { users } from "@/core/server/db/schema/relation-remodel";
import { eq } from "drizzle-orm";

export async function createOrUpdateUser({
    id,
    email,
    firstName,
    lastName,
    profileImageUrl,
    emailVerified,
}: {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    profileImageUrl?: string;
    emailVerified: boolean;
}) {
    const ADMIN_EMAIL_MAIN = "remcostoeten@hotmail.com";
    const ADMIN_EMAIL_SECONDARY = "stoetenremco.rs@gmail.com";

    const isAdmin = email === ADMIN_EMAIL_MAIN || email === ADMIN_EMAIL_SECONDARY;

    const existingUser = await db.select().from(users).where(eq(users.id, id));

    if (existingUser.length > 0) {
        // Update existing user
        await db
            .update(users)
            .set({
                email,
                firstName,
                lastName,
                profileImageUrl,
                emailVerified,
                isAdmin,
                lastSignIn: Math.floor(Date.now() / 1000),
                signInCount: existingUser[0].signInCount + 1,
                updatedAt: Math.floor(Date.now() / 1000),
            })
            .where(eq(users.id, id));
    } else {
        // Create new user
        await db.insert(users).values({
            id,
            email,
            firstName,
            lastName,
            profileImageUrl,
            emailVerified,
            isAdmin,
            lastSignIn: Math.floor(Date.now() / 1000),
            signInCount: 1,
            createdAt: Math.floor(Date.now() / 1000),
            updatedAt: Math.floor(Date.now() / 1000),
        });
    }
}
