import { Hono } from "hono";
import type { Context } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();

app.get("/", (c: Context) => c.text("Hello from the server Node.js!"));

serve({
  fetch: app.fetch.bind(app),
  port: 8000,
});
