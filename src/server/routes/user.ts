import { z } from 'zod';
import { procedure, router } from '../trpc';
import { userTable } from '@/drizzle/schemas/user';

export const userRouter = router({
   ping: procedure.input(z.object({ message: z.string() })).query(async ({ input }) => {
      return { message: `Ping pong: ${input.message}` };
   }),

   getUsers: procedure.query(async ({ ctx }) => {
      const users = await ctx.db
         .select({ 
            id: userTable.id, 
            name: userTable.name, 
            email: userTable.email, 
            createdAt: userTable.createdAt, 
            updatedAt: userTable.updatedAt 
          })
         .from(userTable);
         
      return users;
   }),
});
