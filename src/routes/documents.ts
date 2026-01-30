// # Document upload/processing routes
import { Router, Request, Response } from "express";

const documentRouter = Router();

documentRouter.get("/", (req: Request, res: Response) => {
  res.send("document route");
  // List all documents
  // Add pagination
  // Filter by status, type, date
});

documentRouter.post("/upload", (req: Request, res: Response) => {
  res.send("document route");
  // Accept multipart form data
  // Validate file type and size
  // Save file to uploads directory
  // Create database record with 'pending' status
  // Queue processing job
  // Return document ID and job ID
});

documentRouter.post("/process:id", (req: Request, res: Response) => {
  res.send("document route");
  // Trigger manual processing
  // Useful for reprocessing failed documents
});

documentRouter.get("/:id", (req: Request, res: Response) => {
  res.send("document route");
  // Fetch document by ID
  // Return metadata and extracted data
  // Include processing status
});

documentRouter.get("/:id/status", (req: Request, res: Response) => {
  res.send("document route");
  // Return just the processing status
  // For polling during background processing
});

export default documentRouter;
