import { env } from '@/lib/env';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: "src/drizzle/schemas/*.ts",
  out: "src/drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
})