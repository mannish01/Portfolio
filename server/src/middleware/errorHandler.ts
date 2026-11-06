import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

// Sanitize error messages to prevent information disclosure
const sanitizeMessage = (message: string): string => {
  // Remove potentially sensitive stack trace information in production
  if (message.includes('stack') || message.includes('trace')) {
    return message.replace(/at [\s\S]*?\n/g, '');
  }
  return message;
};

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error('[Error Handler] Error occurred');

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    const formattedErrors = err.errors.map((e) => ({
      field: e.path.join('.'),
      message: sanitizeMessage(e.message),
    }));
    res.status(400).json({
      success: false,
      message: 'Validation failed. Please verify your inputs.',
      errors: formattedErrors,
    });
    return;
  }

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((el: any) => ({
      field: el.path,
      message: sanitizeMessage(el.message),
    }));
    res.status(400).json({
      success: false,
      message: 'Database schema validation error.',
      errors,
    });
    return;
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error occurred.';

  const responseBody: any = {
    success: false,
    message: sanitizeMessage(message),
  };

  // Only include stack trace in development environment for debugging purposes
  if (process.env.NODE_ENV === 'development' && err.stack) {
    responseBody.stack = err.stack;
  }

  res.status(statusCode).json(responseBody);
};

// Custom error class for consistent error handling
export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

