import express from "express";
import documentRouter from "./routes/documents.js";
import pool from "./database/db.js";

const app = express();
const port = 8000;

app.use(express.json());
app.use("/api/v1/document", documentRouter);

async function startServer() {
  try {
    await pool.query("SELECT 1");
    console.log("Database connected");

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Startup failed", err);
    process.exit(1);
  }
}

startServer();
