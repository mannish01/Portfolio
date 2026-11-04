import { z } from 'zod';

export const contactSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .trim()
    .min(2, 'Name must be at least 2 characters long')
    .max(80, 'Name must be less than 80 characters'),
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .email('Please provide a valid email address')
    .max(100, 'Email must be less than 100 characters')
    .toLowerCase(),
  subject: z
    .string({ required_error: 'Subject is required' })
    .trim()
    .min(3, 'Subject must be at least 3 characters long')
    .max(120, 'Subject must be less than 120 characters'),
  message: z
    .string({ required_error: 'Message is required' })
    .trim()
    .min(10, 'Message must be at least 10 characters long')
    .max(2500, 'Message cannot exceed 2500 characters'),
});

export type ContactInput = z.infer<typeof contactSchema>;

