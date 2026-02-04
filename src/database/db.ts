import { Pool } from "pg";
import { DATABASE_URL } from "../utils/config.js";

const isProduction = process.env.NODE_ENV === "production";
console.log(DATABASE_URL);
console.log(process.env.NODE_ENV);

if (!DATABASE_URL || typeof DATABASE_URL !== "string") {
  console.error("Missing or invalid DATABASE_URL environment variable");
  throw new Error("Missing or invalid DATABASE_URL environment variable");
}

// Enable SSL for remote/hosted databases (e.g., Render, AWS RDS)
// Disable only for localhost connections
const isLocalhost =
  DATABASE_URL.includes("localhost") || DATABASE_URL.includes("127.0.0.1");
const sslConfig = isLocalhost ? false : { rejectUnauthorized: false };

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: sslConfig,
});

pool.on("connect", () => {
  console.log("PostgreSQL connected");
});

pool.on("error", (err) => {
  console.error("Unexpected PG error", err);
  process.exit(1);
});

export default pool;
