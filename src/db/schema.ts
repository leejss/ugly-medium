export * from "./tables/users";
export * from "./tables/session";

// export const usersTable = pgTable("users_table", {
//   id: serial("id").primaryKey(),
//   email: text("email").notNull().unique(),
//   password: text("password").notNull(),
// });

// export const postsTable = pgTable("posts_table", {
//   id: serial("id").primaryKey(),
//   title: text("title").notNull(),
//   content: text("content").notNull(),
//   userId: integer("user_id")
//     .notNull()
//     .references(() => usersTable.id, { onDelete: "cascade" }),
//   createdAt: timestamp("created_at").notNull().defaultNow(),
//   updatedAt: timestamp("updated_at")
//     .notNull()
//     .$onUpdate(() => new Date()),
// });

// export type InsertPost = typeof postsTable.$inferInsert;
// export type SelectPost = typeof postsTable.$inferSelect;
