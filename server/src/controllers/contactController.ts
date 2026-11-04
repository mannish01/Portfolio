import { Request, Response, NextFunction } from 'express';
import { contactSchema } from '../validators/contactValidator.js';
import { Contact } from '../models/Contact.js';
import { isDbConnected } from '../config/db.js';
import { sendContactNotification } from '../services/emailService.js';

export const handleContactSubmit = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // 1. Zod validation
    const validatedData = contactSchema.parse(req.body);

    // 2. Database connection status check
    if (!isDbConnected()) {
      res.status(503).json({
        success: false,
        isConfigError: true,
        message:
          'Database connection is not configured or currently offline. Please configure a valid MONGODB_URI in server/.env (e.g. MongoDB Atlas or local mongod) to store contact messages.',
        validatedData: {
          name: validatedData.name,
          email: validatedData.email,
          subject: validatedData.subject,
        },
      });
      return;
    }

    // 3. Save contact message to MongoDB Atlas
    const newContact = await Contact.create({
      name: validatedData.name,
      email: validatedData.email,
      subject: validatedData.subject,
      message: validatedData.message,
    });

    // 4. Dispatch Email Notification (await to ensure completion before response)
    try {
      const emailSent = await sendContactNotification(validatedData);
      console.log(`[Contact Submit] Email notification status: ${emailSent ? 'Delivered' : 'Skipped/Failed'}`);
    } catch (emailErr) {
      console.error('[Contact Submit] Unexpected email dispatch error:', emailErr);
    }

    res.status(201).json({
      success: true,
      message: "Thank you for your message! Manish has received it and will get back to you shortly.",
      data: {
        id: newContact._id,
        name: newContact.name,
        subject: newContact.subject,
        createdAt: newContact.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Retrieve submitted messages for portfolio owner
export const getContactMessages = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!isDbConnected()) {
      res.status(503).json({
        success: false,
        message: 'Database is currently offline. Cannot retrieve messages.',
      });
      return;
    }

    const messages = await Contact.find().sort({ createdAt: -1 }).limit(100);
    res.status(200).json({
      success: true,
      count: messages.length,
      database: 'MongoDB Atlas (manish_portfolio.contacts)',
      messages,
    });
  } catch (error) {
    next(error);
  }
};
