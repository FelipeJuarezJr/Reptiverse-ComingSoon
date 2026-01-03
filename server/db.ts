import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  // Instead of throwing a fatal error that kills the server,
  // we log it so you can see it in Vercel logs.
  console.error("DATABASE_URL is missing!");
}

// Prepare the postgres client with specific options for Neon/Vercel
const client = postgres(connectionString || "", {
  prepare: false, // Essential for serverless/connection poolers like Neon
  ssl: 'require'  // Forces SSL which Neon requires
});

export const db = drizzle(client);
