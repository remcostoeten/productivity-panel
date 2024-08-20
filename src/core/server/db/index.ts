import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

const client = createClient({
  url: "libsql://nlziet-remcostoeten.turso.io",
  authToken:
    "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjQwNzQ5MDEsImlkIjoiZGQxZTU2MmQtODM3MC00NTAyLWI3N2QtYTY1ZGY5ZDkwMTdkIn0.UhtvP0dGpBpN-w23Jnh7bP_3OYmLVYqy2bO-s1sKM4DnYcONgCIC8RfGdfApjZD8x0l3WNqTIhX9kYcEuWppCg",
});

export const db = drizzle(client);

// Disable migrate function if using Edge runtime and use `npm run db:migrate` instead.
// Only run migrate in development. Otherwise, migrate will also be run during the build which can cause errors.
// Migrate during the build can cause errors due to the locked database when multiple migrations are running at the same time.
// if (process.env.NODE_ENV === 'development') {
//   await migrate(db, { migrationsFolder: './migrations' });
// }
