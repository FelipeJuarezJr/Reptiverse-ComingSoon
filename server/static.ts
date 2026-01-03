import express, { type Express } from "express";
import path from "path";

export function serveStatic(app: Express) {
  // Use process.cwd() instead of __dirname for Vercel compatibility
  const distPath = path.resolve(process.cwd(), "dist", "public");

  // Serve static files from the build directory
  app.use(express.static(distPath));

  // Fallback to index.html for Single Page Application (SPA) routing
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"), (err) => {
      if (err) {
        // If index.html is missing, don't crash the server, just send a 404
        res.status(404).send("Site is still building or dist/public/index.html is missing.");
      }
    });
  });
}