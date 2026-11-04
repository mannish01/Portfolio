import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import healthRoutes from './routes/healthRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Security Headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or same-origin dev proxy)
      if (!origin) return callback(null, true);
      const allowedOrigins = [
        CLIENT_URL,
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'http://localhost:3000',
      ];
      if (allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }
      return callback(new Error('CORS not allowed for this origin'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Body parsing
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Request Logger (Development)
if (process.env.NODE_ENV !== 'production') {
  app.use((req: Request, _res: Response, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });
}

// API Routes
app.use('/api/health', healthRoutes);
app.use('/api/contact', contactRoutes);

// Static client serving in production
const clientDistPath = path.resolve(__dirname, '../../client/dist');
app.use(express.static(clientDistPath));

// API 404 handler
app.use('/api/*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `API endpoint ${req.method} ${req.originalUrl} not found`,
  });
});

// Single Page Application (SPA) fallback
app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(clientDistPath, 'index.html'), (err) => {
    if (err) {
      res.json({
        service: 'Manish Kumar Portfolio API Server',
        status: 'running',
        endpoints: {
          health: '/api/health',
          contact: 'POST /api/contact',
        },
      });
    }
  });
});

// Centralized error handling
app.use(errorHandler);

// Initialize Database & Start Server
const startServer = async () => {
  try {
    // Attempt MongoDB connection (non-blocking if DB is temporarily unavailable)
    await connectDB();

    app.listen(PORT, () => {
      console.log(`===============================================`);
      console.log(`🚀 Manish Kumar Portfolio API Server Running`);
      console.log(`📡 URL: http://localhost:${PORT}`);
      console.log(`🩺 Health: http://localhost:${PORT}/api/health`);
      console.log(`📬 Contact: POST http://localhost:${PORT}/api/contact`);
      console.log(`===============================================`);
    });
  } catch (error) {
    console.error('Fatal error starting server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
