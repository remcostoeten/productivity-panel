import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

const client = createClient({
  url: "libsql://ppppp-remcostoeten.turso.io",
  authToken:
    "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjM2NzI2MTIsImlkIjoiN2RiZWZlOWUtZjg0OC00ZTNhLWI0ZTgtOWU5ZjJmZDQ5MTM2In0.mf3XvKpOdzVs5qOiguZxMZWkvccZ5J8TfMs1_5CQ2JC5PxJ5xAK5vs6Jp3NEqIM9M-YCQhadORNbxcao2V0eCg",
});

export const db = drizzle(client);

// Disable migrate function if using Edge runtime and use `npm run db:migrate` instead.
// Only run migrate in development. Otherwise, migrate will also be run during the build which can cause errors.
// Migrate during the build can cause errors due to the locked database when multiple migrations are running at the same time.
// if (process.env.NODE_ENV === 'development') {
//   await migrate(db, { migrationsFolder: './migrations' });
// }
