# 🦎 Reptiverse - Coming Soon

A modern, high-performance "Coming Soon" landing page for the **Reptiverse** ecosystem. This project collects subscriber emails and serves as the gateway to ReptiGram, RepFiles, and the Reptiverse Marketplace.

---

## 🛠️ Tech Stack
- **Frontend:** React + Vite
- **Styling:** Tailwind CSS v4 (using the new CSS-first `@theme` configuration)
- **Backend:** Node.js + Express
- **Database:** PostgreSQL via [Neon](https://neon.tech)
- **ORM:** Drizzle ORM
- **Deployment:** Vercel (Serverless Functions)

---

## 📂 Project Structure & Vercel Logic

To run on Vercel's serverless infrastructure, the project uses a specific "Bridge" architecture:

- **`vercel.json`**: Configured to route all traffic (API and Frontend) to the `api/index.ts` entry point.
- **`api/index.ts`**: The entry point for Vercel. It waits for the `appReady` promise to resolve before handling requests to ensure the database and routes are initialized.
- **`server/index.ts`**: The core Express logic. It exports `appReady` (the initialization promise) and the `app` instance.
- **Static Assets**: The frontend is built into `dist/public`. Vercel is configured via `includeFiles` to bundle these assets with the serverless function.

---

## 🗄️ Database Management

We use **Drizzle ORM** to manage our PostgreSQL database on Neon.

### Viewing Data Locally (Drizzle Studio)
To browse your `email_subscribers` table in a spreadsheet-like interface:
1. Run the following command in your terminal:
   ```bash
   npx drizzle-kit studio