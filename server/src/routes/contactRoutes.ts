import { Router } from 'express';
import { handleContactSubmit } from '../controllers/contactController.js';
import { contactRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// Reads of submitted contact messages are intentionally not exposed over HTTP.
// The owner can inspect messages locally with server/src/scripts/viewMessages.ts.
// POST /api/contact - Rate limited & Zod validated submission
router.post('/', contactRateLimiter, handleContactSubmit);

export default router;
