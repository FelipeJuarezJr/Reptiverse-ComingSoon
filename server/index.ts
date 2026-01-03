import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
    express.json({
      verify: (req, _res, buf) => {
        req.rawBody = buf;
      },
    }),
);

app.use(express.urlencoded({ extended: false }));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      log(logLine);
    }
  });

  next();
});

// --- REFACTORED INITIALIZATION ---

// 1. Synchronously register middleware/routes where possible
// Note: If registerRoutes MUST be awaited, we do it in a non-blocking way for Vercel
registerRoutes(httpServer, app).then(() => {
  // 2. Setup Error Handling after routes
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
  });

  // 3. Setup Static Files or Vite
  if (process.env.NODE_ENV === "production" || process.env.VERCEL) {
    serveStatic(app);
  } else {
    // We use a dynamic import here to keep the production bundle small
    import("./vite").then(({ setupVite }) => {
      setupVite(httpServer, app);
    });
  }

  // 4. ONLY listen if we are NOT on Vercel
  if (!process.env.VERCEL) {
    const port = parseInt(process.env.PORT || "5000", 10);
    httpServer.listen(
        {
          port,
          host: "0.0.0.0",
          reusePort: true,
        },
        () => {
          log(`serving on port ${port}`);
        },
    );
  }
}).catch(err => {
  console.error("Failed to initialize server:", err);
});

// Vercel needs this export to be immediately available at the top level
export default app;