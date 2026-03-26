import * as u from "drizzle-orm/pg-core";

export const usersTable = u.pgTable(
  "users",
  {
    // Primary key
    id: u.integer().primaryKey().generatedAlwaysAsIdentity(),

    // Basic user information
    name: u.varchar({ length: 255 }).notNull(),
    email: u.varchar({ length: 255 }).notNull().unique(),

    // Optional fields (age might not always be required)
    age: u.integer(),

    // Authentication & API
    api_key: u.varchar({ length: 64 }).notNull().unique(), // Consider hashing this
    password_hash: u.varchar({ length: 255 }), // If you need password authentication

    // Account status
    is_active: u.boolean().notNull().default(true),
    is_verified: u.boolean().notNull().default(false),

    // Usage tracking
    document_count: u.integer().notNull().default(0), // Track total documents uploaded
    storage_used: u.integer().notNull().default(0), // Total storage in bytes

    // Rate limiting / quota
    api_calls_count: u.integer().notNull().default(0),
    api_calls_reset_at: u.timestamp(),
    max_documents: u.integer().default(100), // Document upload limit
    max_storage: u.integer().default(1073741824), // 1GB in bytes

    // Timestamps
    created_at: u.timestamp().notNull().defaultNow(),
    updated_at: u.timestamp().notNull().defaultNow(),
    last_login_at: u.timestamp(),
    email_verified_at: u.timestamp(),

    // Soft delete (optional)
    deleted_at: u.timestamp(),
  },
  (table) => [
    // Indexes for performance
    u.index("email_idx").on(table.email),
    u.index("api_key_idx").on(table.api_key),
    u.index("is_active_idx").on(table.is_active),
    u.index("created_at_idx").on(table.created_at),
  ],
);

// Type inference for TypeScript
export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;

// Helper type for public user data (exclude sensitive fields)
export type PublicUser = Omit<User, "api_key" | "password_hash">;
