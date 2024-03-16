import { sql } from "drizzle-orm";
import { text, boolean, pgTable, timestamp } from "drizzle-orm/pg-core";

export const todo = pgTable("todo", {
  id: text("id").primaryKey().notNull().unique(),
  text: text("text").notNull(),
  done: boolean("done").default(false).notNull(),
  created_at: timestamp("created_at").default(sql`now()`),
  updated_at: timestamp("updated_at").default(sql`now()`),
});
