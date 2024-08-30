import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

const client = createClient({
  url: 'libsql://remoddeling-remcostoeten.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MjQ3NjY3NDMsImlkIjoiZmY4ZmQyMjUtYzM4Zi00Njc0LWIzZjctYWJlM2I1MDUwZmE2In0.Uz5GRaefawOgdUdYYPWGRzPy4-OOT6UhdWMp8lMmuqmEt5fb2fKSQ0wdc5evqGeYD9U_kg4pMTIUew5aksv2Ag',
});

export const db = drizzle(client);
