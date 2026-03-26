import Fastify from "fastify";
import documentRouter from "./routes/documents.js";
import { db } from "./database/db.js";

/**
 * @type {import('fastify').FastifyInstance}
 */

const fastify = Fastify({
  logger: true,
});

const PORT = 3000;

fastify.get("/", (request, reply) => {
  return reply.code(200).send("welcome to prodoc api");
});

fastify.register(documentRouter, { prefix: "/api/v1/document" });

async function startServer() {
  try {
    await db.execute("SELECT 1");
    await fastify.listen({ port: PORT, host: "127.0.0.1" }, function () {
      console.log(`server listening on ${PORT}`);
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

startServer();
