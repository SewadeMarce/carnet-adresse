import { createRequestHandler } from "@react-router/express";
import express, { type Express } from "express";
import cookieParser from "cookie-parser";
import { optionalAuthMiddleware } from "./middleware/auth";
import authRouter from "./routes/auth";
import database from "./config/db";
import { PORT } from "./config/env";

const app: Express = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(optionalAuthMiddleware);

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.get('origin') || '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Health check
app.get('/api/health',async (req, res) => {
 res.json({ status: 'ok', message: 'Server is running' });
});

// Mount API routes
app.use('/api/auth', authRouter);
// Health check


// Initialize database and start server
async function startServer() {
    try {
        // Connect to database
        await database.connect();
      
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
        });
    } catch (error) {
        console.error('❌ Erreur au démarrage du serveur:', error);
        process.exit(1);
    }
}

startServer();