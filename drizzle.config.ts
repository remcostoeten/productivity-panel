import type { Config } from 'drizzle-kit'

/** @type {import('drizzle-kit').Config} */
export default {
    driver: 'turso',
    out: './src/core/server/db/migrations',
    schema: './src/core/server/db/schema/index.ts',
    dialect: 'sqlite',
    dbCredentials: {
        url: process.env.DATABASE_URL || 'sqlite://:memory:',
        authToken: process.env.DATABASE_AUTH_TOKEN
    },  
    verbose: true
} satisfies Config