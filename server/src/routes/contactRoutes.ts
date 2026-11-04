import { Router } from 'express';
import {
  handleContactSubmit,
  getContactMessages,
} from '../controllers/contactController.js';
import { contactRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// GET /api/contact - View all submitted contact messages
router.get('/', getContactMessages);

// POST /api/contact - Rate limited & Zod validated submission
router.post('/', contactRateLimiter, handleContactSubmit);

export default router;
