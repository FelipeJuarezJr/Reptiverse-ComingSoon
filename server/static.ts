import express, { type Express } from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function serveStatic(app: Express) {
  // In Vercel, server/index.ts is the entry.
  // dist/public is two levels up from server/ during the build process.
  const distPath = path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(distPath));

  // Fallback for Single Page Application (SPA) routing
  app.use("*", (req, res, next) => {
    // If the request is for an API, don't serve index.html
    if (req.originalUrl.startsWith("/api")) {
      return next();
    }

    const indexPath = path.join(distPath, "index.html");
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send(`Frontend build not found. Looked in: ${distPath}`);
    }
  });
}