import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage.js";
import { insertEmailSubscriberSchema } from "@shared/schema.js";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Email subscription endpoint
  app.post("/api/subscribe", async (req, res) => {
    try {
      const validated = insertEmailSubscriberSchema.parse(req.body);
      const subscriber = await storage.subscribeEmail(validated);
      res.status(201).json(subscriber);
    } catch (error: any) {
      if (error.code === "23505") {
        // Unique constraint violation
        res.status(409).json({ message: "Email already subscribed" });
      } else if (error.errors) {
        // Zod validation error
        res.status(400).json({ message: "Invalid email address" });
      } else {
        res.status(500).json({ message: "Failed to subscribe" });
      }
    }
  });

  return httpServer;
}
