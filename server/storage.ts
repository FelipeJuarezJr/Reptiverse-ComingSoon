// Changed @shared/schema to relative path with .js
import {
  type User,
  type InsertUser,
  type EmailSubscriber,
  type InsertEmailSubscriber,
  users,
  emailSubscribers
} from "../shared/schema.js";

import { randomUUID } from "crypto";
import { db } from "./db.js"; // Added .js
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  subscribeEmail(email: InsertEmailSubscriber): Promise<EmailSubscriber>;
}

// ... (Rest of your MemStorage and DatabaseStorage classes remain the same) ...

export const storage = new DatabaseStorage();