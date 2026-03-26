import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { DATABASE_URL } from "../utils/config.js";

if (!DATABASE_URL || typeof DATABASE_URL !== "string") {
  throw new Error("Missing or invalid DATABASE_URL");
}

const isLocalhost =
  DATABASE_URL.includes("localhost") || DATABASE_URL.includes("127.0.0.1");

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: isLocalhost ? false : { rejectUnauthorized: true },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on("connect", () => {
  console.log("database connected");
});

pool.on("error", (err) => {
  console.error("Unexpected PG error", err);
  process.exit(1);
});

export const db = drizzle(pool);
