import { drizzle } from "drizzle-orm/node-postgres";
import pool from "../../dist/database/db.js";

export const db = drizzle(pool);
