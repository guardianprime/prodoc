// # Document upload/processing routes
import { FastifyInstance } from "fastify";

async function documentRouter(fastify: FastifyInstance) {
  fastify.get("/", async (request, reply) => {
    return reply.code(200).send("document route");
    // List all documents
    // Add pagination
    // Filter by status, type, date
  });

  fastify.post("/upload", async (request, reply) => {
    return reply.code(201).send("document route");
    // Accept multipart form data
    // Validate file type and size
    // Save file to uploads directory
    // Create database record with 'pending' status
    // Queue processing job
    // Return document ID and job ID
  });

  fastify.post("/process:id", async (request, reply) => {
    return reply.code(201).send("document route");
    // Trigger manual processing
    // Useful for reprocessing failed documents
  });

  fastify.get("/:id", async (request, reply) => {
    return reply.code(200).send("document route");
    // Fetch document by ID
    // Return metadata and extracted data
    // Include processing status
  });

  fastify.get("/:id/status", async (request, reply) => {
    return reply.code(200).send("document route");
    // Return just the processing status
    // For polling during background processing
  });
}

export default documentRouter;
