import express, { type Express } from "express";
import path from "path";
import fs from "fs";

export function serveStatic(app: Express) {
  // Use process.cwd() as the base, then look into dist/public
  const distPath = path.join(process.cwd(), "dist", "public");

  // Log for your Vercel Function logs (helpful if this still fails)
  console.log(`Searching for static files in: ${distPath}`);

  if (fs.existsSync(distPath)) {
    console.log("Found dist/public! Files:", fs.readdirSync(distPath));
  }

  app.use(express.static(distPath));

  app.use("*", (req, res, next) => {
    // Skip if it's an API route
    if (req.originalUrl.startsWith("/api")) {
      return next();
    }

    const indexPath = path.join(distPath, "index.html");

    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send(`Build assets missing. Please check Vercel Logs for: ${distPath}`);
    }
  });
}