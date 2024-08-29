import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

const client = createClient({
  url: process.env.DB_URL,
  authToken: process.env.AUTH_TOKEN,
});

export const db = drizzle(client);
