import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { connectDB, isDbConnected } from './config/db.js';
import healthRoutes from './routes/healthRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import { errorHandler, AppError } from './middleware/errorHandler.js';
import { apiRateLimiter } from './middleware/rateLimiter.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Enhanced Security Headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdn.jsdelivr.net"],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
        imgSrc: ["'self'", "data:", "https://portfolio-vx8y.onrender.com"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        connectSrc: ["'self'", "https://portfolio-vx8y.onrender.com"],
        frameSrc: ["'none'"],
        objectSrc: ["'none'"],
      },
    },
    referrerPolicy: { policy: 'no-referrer' },
    xFrameOptions: { action: 'deny' },
    hidePoweredBy: true,
  }
)
);

// CORS configuration with strict origin validation
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or same-origin browser requests)
      if (!origin) return callback(null, true);
      
      // Only allow specific origins in production for security
      if (process.env.NODE_ENV === 'production') {
        const allowedOrigins = CLIENT_URL ? [CLIENT_URL] : ['https://portfolio-vx8y.onrender.com'];
        if (allowedOrigins.includes(origin)) {
          return callback(null, true);
        }
        return callback(new Error('CORS policy violation: Origin not allowed'), false);
      }
      
      // Allow localhost origins in development
      if (origin && (origin.includes('localhost') || origin.includes('127.0.0.1'))) {
        return callback(null, true);
      }
      
      return callback(null, true);
    },
    credentials: false,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    preflightContinue: false,
  })
);

// Enhanced Body parsing with size limits and content type validation
app.use(express.json({ 
  limit: process.env.EXPRESS_JSON_LIMIT || '100kb',
  verify: (req, res, buf) => {
    const contentType = req.headers['content-type'];
    if (contentType && !contentType.includes('application/json')) {
      throw new Error(`Invalid content type: ${contentType}`);
    }
  }
}));

app.use(express.urlencoded({ 
  extended: true, 
  limit: process.env.EXPRESS_URLENCODED_LIMIT || '100kb',
}));

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enhanced Request Logger with better formatting
if (process.env.NODE_ENV !== 'production') {
  app.use((req: Request, _res: Response, next: NextFunction) => {
    const now = new Date().toISOString();
    console.log(`[${now}] ${req.method} ${req.originalUrl} - IP: ${req.ip}`);
    next();
  });
}

// Apply general API rate limiting to all API routes
app.use('/api/', apiRateLimiter);

// API Routes
app.use('/api/health', healthRoutes);
app.use('/api/contact', contactRoutes);

// Static client serving in production
const clientDistPath = path.resolve(__dirname, '../../client/dist');
app.use(express.static(clientDistPath, {
  maxAge: process.env.NODE_ENV === 'production' ? '1d' : '0',
  etag: true,
}));

// API 404 handler
app.use('/api/*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `API endpoint ${req.method} ${req.originalUrl} not found`,
  });
});

// Comprehensive health check endpoint
app.get('/health', async (_req: Request, res: Response) => {
  const healthStatus: any = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  };

  try {
    const dbStatus = isDbConnected();
    healthStatus.database = {
      status: dbStatus ? 'connected' : 'disconnected',
      connection: process.env.MONGODB_URI ? 'configured' : 'default',
    };
  } catch (error) {
    healthStatus.database = {
      status: 'error',
      error: 'Database health check failed',
    };
  }

  healthStatus.memory = process.memoryUsage();
  healthStatus.version = process.env.npm_package_version || '1.0.0';

  res.status(200).json(healthStatus);
});

// Single Page Application (SPA) fallback
app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(clientDistPath, 'index.html'), (err) => {
    if (err) {
      console.error('Error serving index.html:', err.message);
      res.json({
        service: 'Manish Kumar Portfolio API Server',
        status: 'running',
        timestamp: new Date().toISOString(),
        endpoints: {
          health: '/health',
          apiHealth: '/api/health',
          contact: 'POST /api/contact',
        },
      });
    }
  });
});

// Centralized error handling
app.use(errorHandler);

// Global unhandled promise rejection handler
process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  if (reason instanceof Error) {
    console.error('Error stack:', reason.stack);
  }
});

// Initialize Database & Start Server
const startServer = async () => {
  try {
    // Attempt MongoDB connection (non-blocking if DB is temporarily unavailable)
    await connectDB();

    app.listen(PORT, () => {
      console.log(`==============================================`);
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/health`);
      console.log(`📧 Contact API: http://localhost:${PORT}/api/contact (POST)`);
      console.log(`🛡️ Security: Enhanced headers and rate limiting enabled`);
      console.log(`==============================================`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;

// Express application server

