import { integer, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import crypto from "crypto";
import { relations, sql } from "drizzle-orm";
import { userTable } from "./user";

export const sessionTable = pgTable("sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  token: varchar("token", { length: 255 }).notNull().$defaultFn(() => crypto.randomBytes(32).toString("hex")),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => sql`current_timestamp`),
})

export const sessionRelations = relations(sessionTable, ({ one }) => ({
  user: one(userTable, {
    fields: [sessionTable.userId],
    references: [userTable.id],
  })
}))

export type SelectSession = typeof sessionTable.$inferSelect;
export type InsertSession = typeof sessionTable.$inferInsert;