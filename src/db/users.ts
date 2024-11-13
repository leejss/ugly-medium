import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { db } from ".";
import { eq } from "drizzle-orm";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

// type NewUser = typeof users.$inferInsert;

// const insertUser = async (user: NewUser) => {
//   return db.insert(users).values(user);
// }

export async function insertUser(user: InsertUser) {
  return await db.insert(usersTable).values(user).returning();
}

// const newUser: NewUser = { name: "Alef" };
// await insertUser(newUser);

// await db.select().from(users).where(eq(users.id, 42));
// await db.select().from(users).where(lt(users.id, 42));
// await db.select().from(users).where(gte(users.id, 42));
// await db.select().from(users).where(ne(users.id, 42));

export async function selectUserByEmail(email: string) {
  const users = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));
  return users[0];
}
