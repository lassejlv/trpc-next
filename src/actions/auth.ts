"use server";

import { db } from "@/drizzle";
import { sessionTable } from "@/drizzle/schemas/session";
import type { SelectUser } from "@/drizzle/schemas/user";
import type { Action } from "@/types/response";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

export const auth = async (): Promise<Action<SelectUser | null>> => {

  const cookie = cookies().get("session_token");
  if (!cookie) return { success: false, message: "Not authenticated", data: null };

  const session = await db.query.sessionTable.findFirst({ where: eq(sessionTable.token, cookie.value ), with: { user: true } });
  if (!session) return { success: false, message: "Not authenticated", data: null };

  return { success: true, data: session.user };
}