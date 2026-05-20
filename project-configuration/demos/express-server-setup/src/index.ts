/**
 * Demonstrates setting up Express with TypeScript.
 * Focus: TypeScript configuration catches Express type errors at compile time.
 */

import express, { type Request, type Response } from "express";
import type { Express } from "express";

const app: Express = express();
app.use(express.json());

// Typed route handler — req and res are fully typed
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Typed request body
interface CreateUserBody {
  name: string;
  email: string;
}

app.post("/api/users", (req: Request, res: Response) => {
  const body = req.body as CreateUserBody;
  if (!body.name || !body.email) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }
  res.status(201).json({ id: 1, name: body.name, email: body.email });
});

// Type-safe query param extraction
function getQueryParam(req: Request, param: string): string | undefined {
  return req.query[param] as string | undefined;
}

app.get("/api/search", (req: Request, res: Response) => {
  const q = getQueryParam(req, "q");
  if (!q) {
    res.status(400).json({ error: "Missing query" });
    return;
  }
  res.json({ results: [`Result for: ${q}`] });
});

export { app, getQueryParam };
