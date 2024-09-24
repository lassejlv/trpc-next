import { z } from "zod";
import { procedure, router } from "../trpc";
import { userTable } from "@/drizzle/schemas/user";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import bcrypt from 'bcryptjs';
import { sessionTable } from "@/drizzle/schemas/session";
import { cookies } from "next/headers";
import { env } from "@/lib/env";

const schema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(50)
})

export const authRouter = router({
  register: procedure.input(schema).mutation(async ({ input, ctx }) => {
    
    const { db } = ctx;
    const user = await db.select().from(userTable).where(eq(userTable.email, input.email)).limit(1);
    if (user[0]) throw new TRPCError({ code: 'BAD_REQUEST', message: 'User already exists' });


    await db.insert(userTable).values({
      name: input.name,
      email: input.email,
      password: await bcrypt.hash(input.password, 10)
    })

    return { success: true }
  }),

  login: procedure.input(schema.pick({ email: true, password: true })).mutation(async ({ input, ctx }) => {
    const { db } = ctx;

    const user = await db.select().from(userTable).where(eq(userTable.email, input.email)).limit(1);
    if (!user[0]) throw new TRPCError({ code: 'BAD_REQUEST', message: 'User not found' });

    const isValid = await bcrypt.compare(input.password, user[0].password);
    if (!isValid) throw new TRPCError({ code: 'BAD_REQUEST', message: 'Invalid password' });

    const newSession = await db.insert(sessionTable).values({ userId: user[0].id }).returning({ token: sessionTable.token});

    cookies().set("session_token", newSession[0].token, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
    });
    

    return { success: true }
  }),

  session: procedure.query(async ({ ctx }) => {
    
    const session = await ctx.auth();
    if (!session.success || !session.data) return null;

    return session.data;
  })

})