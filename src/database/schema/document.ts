import * as p from "drizzle-orm/pg-core";

export const documentsTable = p.pgTable(
  "documents",
  {
    id: p.integer().primaryKey().generatedAlwaysAsIdentity(),
    user_id: p.varchar({ length: 255 }).notNull(),

    // file information
    filename: p.varchar({ length: 255 }).notNull(),
    file_path: p.varchar({ length: 500 }).notNull().unique(), // Path should be unique
    file_size: p.integer().notNull(), // Size in bytes (use integer, not varchar)
    mime_type: p.varchar({ length: 100 }).notNull(), // e.g., 'application/pdf'

    // Document classification
    document_type: p.varchar({ length: 100 }), // e.g., 'invoice', 'contract', 'receipt'

    // Processing status
    status: p.varchar({ length: 50 }).notNull().default("pending"), // 'pending', 'processing', 'completed', 'failed'

    // OCR/Extracted content
    ocr_text: p.text(), // Use text for potentially large content

    // Error handling
    error_message: p.text(), // Use text for detailed error messages
    retry_count: p.integer().notNull().default(0),

    // Timestamps
    uploaded_at: p.timestamp().notNull().defaultNow(),
    processing_started_at: p.timestamp(),
    processing_completed_at: p.timestamp(),

    // Additional metadata (flexible JSON field)
    metadata: p.json().$type<{
      original_name?: string;
      pages?: number;
      language?: string;
      confidence_score?: number;
      tags?: string[];
      [key: string]: any;
    }>(),
  },
  (table) => [
    // Indexes for performance
    p.index("status_idx").on(table.status),
    p.index("document_type_idx").on(table.document_type),
    p.index("user_id_idx").on(table.user_id),
    p.index("uploaded_at_idx").on(table.uploaded_at),

    // Composite indexes for common query patterns
    p.index("user_status_idx").on(table.user_id, table.status),
    p.index("user_type_idx").on(table.user_id, table.document_type),
  ],
);

// Type inference for TypeScript
export type Document = typeof documentsTable.$inferSelect;
export type NewDocument = typeof documentsTable.$inferInsert;
