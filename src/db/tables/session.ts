import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { usersTable } from "./users";

export const sessionTable = pgTable("session", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id),

  // Timestamp fields
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type SelectSession = typeof sessionTable.$inferSelect;
