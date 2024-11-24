import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { db } from "..";
import { eq } from "drizzle-orm";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});

export async function insertUser(user: InsertUser) {
  return await db.insert(usersTable).values(user).returning();
}

export async function selectUserByEmail(email: string) {
  const users = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));
  return users[0];
}

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
