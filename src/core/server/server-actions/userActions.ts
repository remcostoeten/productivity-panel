export async function createOrUpdateUser(userData: {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  profileImageUrl?: string;
  admin: boolean;
  emailVerified: boolean;
}) {
  const { id, email, firstName, lastName, profileImageUrl, emailVerified } =
    userData;

  // Debug logs
  console.log("Creating/Updating user:", { id, email, firstName, lastName });
  console.log("ADMIN_EMAIL_MAIN:", process.env.NEXT_PUBLIC_ADMIN_EMAIL_MAIN);
  console.log(
    "ADMIN_EMAIL_SECONDARY:",
    process.env.NEXT_PUBLIC_ADMIN_EMAIL_SECONDARY,
  );

  try {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    const isAdmin =
      FALLBACK_ADMIN_EMAILS.includes(email) ||
      email === process.env.NEXT_PUBLIC_ADMIN_EMAIL_MAIN ||
      email === process.env.NEXT_PUBLIC_ADMIN_EMAIL_SECONDARY;

    if (existingUser.length > 0) {
      await db.transaction(async (tx) => {
        await tx
          .update(users)
          .set({
            email,
            firstName,
            lastName,
            profileImageUrl,
            emailVerified: emailVerified ? 1 : 0,
            isAdmin,
            updatedAt: sql`(strftime('%s', 'now'))`,
          })
          .where(eq(users.id, id));

        await tx
          .update(userSettings)
          .set({
            lastSignIn: sql`(strftime('%s', 'now'))`,
            signInCount: sql`${userSettings.signInCount} + 1`,
            updatedAt: sql`(strftime('%s', 'now'))`,
          })
          .where(eq(userSettings.userId, id));
      });

      console.log(`User ${id} updated and sign-in count incremented`);
    } else {
      await db.transaction(async (tx) => {
        await tx.insert(users).values({
          id,
          email,
          firstName,
          lastName,
          profileImageUrl,
          emailVerified: emailVerified ? 1 : 0,
          isAdmin,
          createdAt: sql`(strftime('%s', 'now'))`,
          updatedAt: sql`(strftime('%s', 'now'))`,
        });

        console.log("Is admin:", isAdmin, "for email:", email);

        await tx.insert(userSettings).values({
          id: crypto.randomUUID(),
          userId: id,
          lastSignIn: sql`(strftime('%s', 'now'))`,
          signInCount: 1,
          isAdmin,
          createdAt: sql`(strftime('%s', 'now'))`,
          updatedAt: sql`(strftime('%s', 'now'))`,
        });

        await tx.insert(userPreferences).values({
          id: crypto.randomUUID(),
          userId: id,
          createdAt: sql`(strftime('%s', 'now'))`,
          updatedAt: sql`(strftime('%s', 'now'))`,
        });

        await tx.insert(messages).values({
          id: crypto.randomUUID(),
          userId: id,
          content: "Welcome to our platform! We're excited to have you here.",
          createdAt: sql`(strftime('%s', 'now'))`,
        });

        await tx.insert(messages).values({
          id: crypto.randomUUID(),
          userId: id,
          content:
            "Don't forget to complete your profile and explore all our features.",
          createdAt: sql`(strftime('%s', 'now'))`,
        });
      });

      console.log(
        `User ${id} created with initial settings, preferences, and welcome messages`,
      );
    }

    return { success: true, id };
  } catch (error) {
    console.error("Error creating or updating user:", error);
    throw new Error("Failed to create or update user");
  }
}
