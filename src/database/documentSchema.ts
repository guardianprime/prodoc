import {
  integer,
  pgTable,
  varchar,
  timestamp,
  text,
  json,
  index,
} from "drizzle-orm/pg-core";

export const documentsTable = pgTable(
  "documents",
  {
    // Primary key
    id: integer().primaryKey().generatedAlwaysAsIdentity(),

    // User reference (for multi-tenant support)
    user_id: varchar({ length: 255 }).notNull(),

    // File information
    filename: varchar({ length: 255 }).notNull(),
    file_path: varchar({ length: 500 }).notNull().unique(), // Path should be unique
    file_size: integer().notNull(), // Size in bytes (use integer, not varchar)
    mime_type: varchar({ length: 100 }).notNull(), // e.g., 'application/pdf'

    // Document classification
    document_type: varchar({ length: 100 }), // e.g., 'invoice', 'contract', 'receipt'

    // Processing status
    status: varchar({ length: 50 }).notNull().default("pending"), // 'pending', 'processing', 'completed', 'failed'

    // OCR/Extracted content
    ocr_text: text(), // Use text for potentially large content

    // Error handling
    error_message: text(), // Use text for detailed error messages
    retry_count: integer().notNull().default(0),

    // Timestamps
    uploaded_at: timestamp().notNull().defaultNow(),
    processing_started_at: timestamp(),
    processing_completed_at: timestamp(),

    // Additional metadata (flexible JSON field)
    metadata: json().$type<{
      original_name?: string;
      pages?: number;
      language?: string;
      confidence_score?: number;
      tags?: string[];
      [key: string]: any;
    }>(),
  },
  (table) => ({
    // Indexes for performance
    statusIdx: index("status_idx").on(table.status),
    documentTypeIdx: index("document_type_idx").on(table.document_type),
    userIdIdx: index("user_id_idx").on(table.user_id),
    uploadedAtIdx: index("uploaded_at_idx").on(table.uploaded_at),

    // Composite indexes for common query patterns
    userStatusIdx: index("user_status_idx").on(table.user_id, table.status),
    userTypeIdx: index("user_type_idx").on(table.user_id, table.document_type),
  }),
);

// Type inference for TypeScript
export type Document = typeof documentsTable.$inferSelect;
export type NewDocument = typeof documentsTable.$inferInsert;
