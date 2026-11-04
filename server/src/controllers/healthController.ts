import { Request, Response } from 'express';
import { isDbConnected } from '../config/db.js';

const startTime = Date.now();

export const getHealthStatus = (_req: Request, res: Response): void => {
  const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);
  const dbConnected = isDbConnected();

  res.status(200).json({
    status: 'ok',
    service: 'Manish Kumar Portfolio API',
    uptime: `${uptimeSeconds}s`,
    timestamp: new Date().toISOString(),
    database: {
      status: dbConnected ? 'connected' : 'disconnected',
      provider: 'MongoDB',
    },
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  });
};

