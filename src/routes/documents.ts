// # Document upload/processing routes
/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */

async function documentRouter(fastify, options) {
  fastify.get("/", async (request, reply) => {
    return { hello: "document route" };
    // List all documents
    // Add pagination
    // Filter by status, type, date
  });

  fastify.post("/upload", async (request, reply) => {
    return { hello: "document route" };
    // Accept multipart form data
    // Validate file type and size
    // Save file to uploads directory
    // Create database record with 'pending' status
    // Queue processing job
    // Return document ID and job ID
  });

  fastify.post("/process:id", async (request, reply) => {
    return { hello: "document route" };
    // Trigger manual processing
    // Useful for reprocessing failed documents
  });

  fastify.get("/:id", async (request, reply) => {
    return { hello: "document route" };
    // Fetch document by ID
    // Return metadata and extracted data
    // Include processing status
  });

  fastify.get("/:id/status", async (request, reply) => {
    return { hello: "document route" };
    // Return just the processing status
    // For polling during background processing
  });
}

export default documentRouter;
