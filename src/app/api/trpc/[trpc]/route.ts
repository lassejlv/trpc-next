import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { db } from "@/drizzle";
import { auth } from "@/actions/auth";
import { appRouter } from "@/server";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => ({
      req,
      db,
      auth,
    }),
  });

export { handler as GET, handler as POST };