import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';

// Custom rate limit response handler
const createRateLimitResponse = (limit: number, windowMs: number) => {
  const minutes = Math.ceil(windowMs / 60000);
  const seconds = Math.ceil((windowMs % 60000) / 1000);
  const timeFrame = minutes > 0 ? `${minutes} minute${minutes > 1 ? 's' : ''}` : `${seconds} second${seconds > 1 ? 's' : ''}`;
  
  return {
    success: false,
    message: `Too many messages sent from this IP address. Please wait ${timeFrame} before trying again.`,
    retryAfter: `${Math.ceil(windowMs / 1000)} seconds`,
    limit: `Maximum ${limit} submissions per ${timeFrame}`  };
};

// General API rate limiter
export const apiRateLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes from env
  max: parseInt(process.env.RATE_LIMIT_MAX || '100'), // Configurable limit
  standardHeaders: true,
  legacyHeaders: false,
  message: createRateLimitResponse(parseInt(process.env.RATE_LIMIT_MAX || '100'), parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000')),
  keyGenerator: (req: Request) => {
    // Use X-Forwarded-For header for real IP in production (behind proxy)
    return req.ip || req.connection.remoteAddress || 'unknown';
  },
  skip: (req: Request) => {
    // Skip rate limiting for health checks
    return req.path.startsWith('/api/health');
  },
  handler: (req: Request, res: Response) => {
    res.status(429).json(createRateLimitResponse(
      parseInt(process.env.RATE_LIMIT_MAX || '100'),
      parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000')
    ));
  }
});

// Contact form specific rate limiter
export const contactRateLimiter = rateLimit({
  windowMs: parseInt(process.env.CONTACT_RATE_LIMIT_WINDOW_MS || '3600000'), // 1 hour
  max: parseInt(process.env.CONTACT_RATE_LIMIT_MAX || '5'), // 5 submissions per hour
  standardHeaders: true,
  legacyHeaders: false,
  message: createRateLimitResponse(
    parseInt(process.env.CONTACT_RATE_LIMIT_MAX || '5'),
    parseInt(process.env.CONTACT_RATE_LIMIT_WINDOW_MS || '3600000')
  ),
  keyGenerator: (req: Request) => {
    return req.ip || req.connection.remoteAddress || 'unknown';
  },
  skip: (req: Request) => {
    return req.path.startsWith('/api/health');
  },
  handler: (req: Request, res: Response) => {
    res.status(429).json(createRateLimitResponse(
      parseInt(process.env.CONTACT_RATE_LIMIT_MAX || '5'),
      parseInt(process.env.CONTACT_RATE_LIMIT_WINDOW_MS || '3600000')
    ));
  }
});

