import Fastify from "fastify";
import documentRouter from "./routes/documents.js";
import pool from "./database/db.js";

/**
 * @type {import('fastify').FastifyInstance}
 */

const fastify = Fastify({
  logger: true,
});

const port = 8000;

fastify.register(documentRouter, { prefix: "/document" });

async function startServer() {
  try {
    await pool.query("SELECT 1");
    console.log("Database connected");

    fastify.listen({ port: 3000 }, function (address) {
      fastify.log.info(`server listening on ${address}`);
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

startServer();
