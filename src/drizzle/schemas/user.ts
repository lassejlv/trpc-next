import { sql } from "drizzle-orm";
import { date, pgTable, serial, varchar } from "drizzle-orm/pg-core";


export const userTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: date("created_at").notNull().defaultNow(),
  updatedAt: date("updated_at").notNull().defaultNow().$onUpdateFn(() => sql`(current_timestamp)`),
})

export type SelectUser = typeof userTable.$inferSelect;
export type InsertUser = typeof userTable.$inferInsert;