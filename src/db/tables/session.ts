import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { db } from ".."
import { usersTable } from "./users"
import { eq } from "drizzle-orm"

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id),

  // Timestamp fields
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

export type SelectSession = typeof sessionTable.$inferSelect
export type InsertSession = typeof sessionTable.$inferInsert

export async function insertSession(insertSession: InsertSession) {
  const [session] = await db.insert(sessionTable).values(insertSession).returning()
  return session
}

// 두 테이블 간 관계와 레코드의 결합을 통해 세션과 사용자 정보를 함께 조회
export async function selectSessionWithUser(sessionId: string) {
  const [result] = await db
    .select({
      user: usersTable,
      session: sessionTable,
    })
    .from(sessionTable)
    .innerJoin(usersTable, eq(usersTable.id, sessionTable.userId))
    .where(eq(sessionTable.id, sessionId))

  return result
}
