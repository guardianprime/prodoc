import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user_id: varchar().notNull(),
  filename: varchar().notNull(),
  file_path: varchar().notNull().unique(),
  file_size: varchar().notNull().unique(),
  mime_type: varchar().notNull().unique(),
  document_type: varchar().notNull().unique(),
  status: varchar().notNull().unique(),
  ocr_text: varchar().notNull().unique(),
  error_message: varchar().notNull(),
  processing_started_at: integer().notNull(),
  retry_count: integer(),
  metadata: varchar().notNull(),
});

// Indexes needed:
//
// Index on status (filter pending/completed)
// Index on document_type (filter by type)
// Index on user_id (if multi-tenant)
// Index on uploaded_at (sort by date)
// Composite index on (user_id, status) for common queries
