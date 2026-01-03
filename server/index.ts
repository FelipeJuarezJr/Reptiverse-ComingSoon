import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes.js";
import { serveStatic } from "./static.js";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);

// middleware and logging
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// IMPORTANT: Vercel needs the app exported immediately
export default app;

// Wrapper for initialization
async function startServer() {
  try {
    // 1. Register API/Database routes
    await registerRoutes(httpServer, app);

    // 2. Global Error Handler
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      res.status(status).json({ message: err.message || "Internal Server Error" });
    });

    // 3. Handle Static Assets (Vite or Production)
    if (process.env.NODE_ENV === "production" || process.env.VERCEL) {
      serveStatic(app);
    } else {
      const { setupVite } = await import("./vite");
      await setupVite(httpServer, app);
    }

    // 4. Standalone listener (only for local dev, NOT Vercel)
    if (!process.env.VERCEL) {
      const port = 5000;
      httpServer.listen(port, "0.0.0.0", () => {
        console.log(`serving on port ${port}`);
      });
    }
  } catch (error) {
    console.error("Initialization error:", error);
  }
}

// Fire and forget initialization
startServer();