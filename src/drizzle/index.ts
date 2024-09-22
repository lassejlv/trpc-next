import { env } from '@/lib/env';
import { drizzle } from 'drizzle-orm/postgres-js';
import { schema } from './export';
import postgres from 'postgres';


const client = postgres(env.DATABASE_URL);

export const db = drizzle(client, {
  logger: env.NODE_ENV === "development" ? true : false,
  schema,
});