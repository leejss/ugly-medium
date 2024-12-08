import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from "./users";
import { db } from "..";

export const authTable = pgTable("auth", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),

  type: text("type", {
    enum: ["email", "oauth"],
  }).notNull(),

  // provider
  provider: text("provider", {
    enum: ["github", "google"],
  }),

  // providerId
  providerId: text("provider_id"),
  // oauth fields
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  expiresAt: timestamp("expires_at"),
  tokenType: text("token_type"),
  scope: text("scope"),

  // common fields
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// CRUD operations

export async function insertAuth(auth: InsertAuth) {
  const result = await db.insert(authTable).values(auth).returning();
  return result[0];
}

export type InsertAuth = typeof authTable.$inferInsert;
