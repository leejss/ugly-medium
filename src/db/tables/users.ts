import { eq } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { db } from "..";

export const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  hashedPassword: text("hashed_password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export async function insertUser(user: InsertUser) {
  return await db.insert(usersTable).values(user).returning();
}

export async function selectUserByEmail(email: string) {
  const users = await db.select().from(usersTable).where(eq(usersTable.email, email));
  return users[0];
}

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
