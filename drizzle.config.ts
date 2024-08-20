/** @type {import('drizzle-kit').Config} */
export default {
  driver: 'turso',
  out: './src/core/server/db/migrations',
  schema: './src/core/server/db/schema/index.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: 'libsql://nlziet-remcostoeten.turso.io',
    authToken:
      'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjQwNzQ5MDEsImlkIjoiZGQxZTU2MmQtODM3MC00NTAyLWI3N2QtYTY1ZGY5ZDkwMTdkIn0.UhtvP0dGpBpN-w23Jnh7bP_3OYmLVYqy2bO-s1sKM4DnYcONgCIC8RfGdfApjZD8x0l3WNqTIhX9kYcEuWppCg',
  },
  verbose: true,
} satisfies Config
