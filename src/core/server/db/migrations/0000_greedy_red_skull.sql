import { sql } from "drizzle-orm";

export const up = sql`
  -- Create users table
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY NOT NULL,
    email TEXT NOT NULL UNIQUE,
    first_name TEXT,
    last_name TEXT,
    is_admin INTEGER DEFAULT 0 NOT NULL,
    last_sign_in INTEGER,
    sign_in_count INTEGER DEFAULT 0 NOT NULL,
    profile_image_url TEXT,
    email_verified INTEGER DEFAULT 0 NOT NULL,
    created_at INTEGER DEFAULT (strftime('%s', 'now')) NOT NULL,
    updated_at INTEGER DEFAULT (strftime('%s', 'now')) NOT NULL
  );

  -- Create site_visits table
  CREATE TABLE IF NOT EXISTS site_visits (
    id TEXT PRIMARY KEY NOT NULL,
    user_id TEXT,
    timestamp INTEGER DEFAULT (strftime('%s', 'now')) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE NO ACTION ON DELETE NO ACTION
  );

  -- Create wishlists table
  CREATE TABLE IF NOT EXISTS wishlists (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    budget INTEGER NOT NULL,
    user_id TEXT NOT NULL,
    created_at INTEGER DEFAULT (strftime('%s', 'now')) NOT NULL,
    updated_at INTEGER DEFAULT (strftime('%s', 'now')) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE NO ACTION ON DELETE NO ACTION
  );

  -- Create wishlist_items table
  CREATE TABLE IF NOT EXISTS wishlist_items (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    description TEXT,
    url TEXT,
    category TEXT,
    wishlist_id TEXT NOT NULL,
    created_at INTEGER DEFAULT (strftime('%s', 'now')) NOT NULL,
    updated_at INTEGER DEFAULT (strftime('%s', 'now')) NOT NULL,
    FOREIGN KEY (wishlist_id) REFERENCES wishlists(id) ON UPDATE NO ACTION ON DELETE NO ACTION
  );

  -- Create unique index on users.email
  CREATE UNIQUE INDEX IF NOT EXISTS users_email_unique ON users (email);
`;

export const down = sql`
  DROP TABLE IF EXISTS wishlist_items;
  DROP TABLE IF EXISTS wishlists;
  DROP TABLE IF EXISTS site_visits;
  DROP TABLE IF EXISTS users;
`;