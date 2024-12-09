import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core"
import { usersTable } from "./users"
import { db } from ".."
import { eq } from "drizzle-orm"

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
})

export async function insertAuth(auth: InsertAuth) {
  const result = await db.insert(authTable).values(auth).returning()
  return result[0]
}

// Update auth record
export async function updateAuth(
  id: string,
  auth: {
    accessToken?: string
    refreshToken?: string
    expiresAt?: Date
    tokenType?: string
    scope?: string
  },
) {
  const result = await db.update(authTable).set(auth).where(eq(authTable.id, id)).returning()
  return result[0]
}

export async function selectAuthByUserId(userId: string) {
  const result = await db
    .select()
    .from(authTable)
    .where(eq(authTable.userId, userId))
    .limit(1)
    .then((rows) => rows[0])

  return result
}

export type InsertAuth = typeof authTable.$inferInsert
export type SelectAuth = typeof authTable.$inferSelect
