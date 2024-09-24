import { auth } from "@/actions/auth";
import { schema } from "@/drizzle/export";
import { initTRPC } from "@trpc/server";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

interface Context {
  req: Request;
  db: PostgresJsDatabase<typeof schema>;
  auth: typeof auth
}

const trpc = initTRPC.context<Context>().create();

export const router = trpc.router;
export const procedure = trpc.procedure;
