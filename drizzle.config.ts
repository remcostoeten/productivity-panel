import type { Config } from 'drizzle-kit'

/** @type {import('drizzle-kit').Config} */
export default {
  driver: 'turso',
  out: './src/core/server/db/migrations',
  schema: './src/core/server/db/schema/index.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'libsql://ppppp-remcostoeten.turso.io',
    authToken:
      'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjM2NzI2MTIsImlkIjoiN2RiZWZlOWUtZjg0OC00ZTNhLWI0ZTgtOWU5ZjJmZDQ5MTM2In0.mf3XvKpOdzVs5qOiguZxMZWkvccZ5J8TfMs1_5CQ2JC5PxJ5xAK5vs6Jp3NEqIM9M-YCQhadORNbxcao2V0eCg',
  },
  verbose: true,
} satisfies Config
