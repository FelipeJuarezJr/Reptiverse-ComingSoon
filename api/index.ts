import app, { appReady } from "../server/index.js";

export default async (req: any, res: any) => {
    // Force Vercel to wait for registerRoutes() and startServer() to finish
    await appReady;

    // Now handle the request
    return app(req, res);
};