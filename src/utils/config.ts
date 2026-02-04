import { config } from "dotenv";

// Load environment in order: environment-specific local, then fallback to .env
config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });
config();

export const PORT = process.env.PORT;
export const DATABASE_URL = process.env.DATABASE_URL;
