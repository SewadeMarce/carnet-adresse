import express, { type Express } from "express";
import cookieParser from "cookie-parser";
import { optionalAuthMiddleware } from "./middleware/auth";

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

export default app;

