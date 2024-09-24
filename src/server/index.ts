import { authRouter } from "./routes/auth";
import { profileRouter } from "./routes/profile";
import { router } from "./trpc";


export const appRouter = router({
  auth: authRouter,
  profile: profileRouter,
});


export type AppRouter = typeof appRouter;