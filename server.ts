import { createRequestHandler } from "@react-router/express";
import express, { type Application } from "express";
import app from "server/app.";
import { PORT } from "server/config/env";



if (process.env.NODE_ENV === "production") {
    app.use(express.static("build/client"));
    app.use(
        createRequestHandler({
            // @ts-expect-error - Vite gère l'import, mais TS peut bloquer sur le chemin build
            build: await import("./build/server/index.js"),
            getLoadContext() {
                return {
                    VALUE_FROM_EXPRESS: "Hello from Express",
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
            getLoadContext() {
                return {
                    VALUE_FROM_EXPRESS: "Hello from Express",
                };
            },
        }),
    );
}

app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Localhost : http://localhost:${PORT}`);
});


