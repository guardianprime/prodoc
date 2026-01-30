import express, { Request, Response } from "express";

const app = express();

const port = 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("working here");
});

app.listen(port, () => {
  console.log(`server is running on localhost:${port}`);
});
