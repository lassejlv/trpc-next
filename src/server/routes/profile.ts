import { z } from "zod";
import { procedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { userTable } from "@/drizzle/schemas/user";



export const profileRouter = router({
  update: procedure.input(z.object({ publicProfile: z.boolean().optional() })).mutation(async ({ input, ctx }) => {
    
    const session = await ctx.auth();
    if (!session.success || !session.data) throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Not authenticated' });

    const { db } = ctx;

    await db.update(userTable).set({
      // This will only update if the input.publicProfile is defined. Beacuse it's optional.
      public: input.publicProfile ?? session.data.public
    })

    return { success: true }
  })
})