import { createRequestHandler } from "@react-router/express";
import express, { type Application } from "express";
import network from "script/network";
import app from "server/app";
import { PORT } from "server/config/env";
import database from "server/config/db";
import authRouter from "server/routes/auth";
import User from "server/models/User.js";

// Mount API routes
app.use('/api/auth', authRouter);
// Health check
app.get('/api/health',async (req, res) => {
 res.json({ status: 'ok', message: 'Server is running' });
});


const networkValue = network()
const Network: string = networkValue ? `Network : http://${networkValue}:${PORT}` : "";

// Initialize database and start server
async function startServer() {
    try {
        // Connect to database
        await database.connect();
      const u = await User.find();
      console.log(JSON.parse(JSON.stringify(u)));
      
        if (process.env.NODE_ENV === "production") {
            app.use(express.static("build/client"));
            app.use(
                createRequestHandler({
                    // @ts-expect-error - Vite gère l'import, mais TS peut bloquer sur le chemin build
                    build: await import("./build/server/index.js"),
                    getLoadContext(req, res) {
                        return {
                            VALUE_FROM_EXPRESS: "Hello from Express",
                            user: req.user
                        };
                    },
                }),
            );
        } else {
            console.log('Server démarré en développement');

            const vite = await import("vite");
            const viteDevServer = await vite.createServer({
                server: { middlewareMode: true },
            });

            app.use(viteDevServer.middlewares);
            app.use(
                createRequestHandler({
                    // @ts-expect-error - Module virtuel spécifique à React Router/Vite
                    build: () =>
                        viteDevServer.ssrLoadModule("virtual:react-router/server-build"),
                    getLoadContext(req, res) {
                        return {
                            VALUE_FROM_EXPRESS: "Hello from Express",
                            user: req.user
                        };
                    },
                }),
            );
        }

        app.listen(PORT, '0.0.0.0', () => {
            console.log(`✅ Localhost : http://localhost:${PORT}`);
            if (Network) console.log(`✅ ${Network}`);
        });
    } catch (error) {
        console.error('❌ Erreur au démarrage du serveur:', error);
        process.exit(1);
    }
}

startServer();