import {
  integer,
  pgTable,
  varchar,
  timestamp,
  boolean,
  index,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable(
  "users",
  {
    // Primary key
    id: integer().primaryKey().generatedAlwaysAsIdentity(),

    // Basic user information
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),

    // Optional fields (age might not always be required)
    age: integer(),

    // Authentication & API
    api_key: varchar({ length: 64 }).notNull().unique(), // Consider hashing this
    password_hash: varchar({ length: 255 }), // If you need password authentication

    // Account status
    is_active: boolean().notNull().default(true),
    is_verified: boolean().notNull().default(false),

    // Usage tracking
    document_count: integer().notNull().default(0), // Track total documents uploaded
    storage_used: integer().notNull().default(0), // Total storage in bytes

    // Rate limiting / quota
    api_calls_count: integer().notNull().default(0),
    api_calls_reset_at: timestamp(),
    max_documents: integer().default(100), // Document upload limit
    max_storage: integer().default(1073741824), // 1GB in bytes

    // Timestamps
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().notNull().defaultNow(),
    last_login_at: timestamp(),
    email_verified_at: timestamp(),

    // Soft delete (optional)
    deleted_at: timestamp(),
  },
  (table) => ({
    // Indexes for performance
    emailIdx: index("email_idx").on(table.email),
    apiKeyIdx: index("api_key_idx").on(table.api_key),
    isActiveIdx: index("is_active_idx").on(table.is_active),
    createdAtIdx: index("created_at_idx").on(table.created_at),
  }),
);

// Type inference for TypeScript
export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;

// Helper type for public user data (exclude sensitive fields)
export type PublicUser = Omit<User, "api_key" | "password_hash">;
