import mongoose, { Schema, Document } from 'mongoose';
import { IContactMessage } from '../types/index.js';

export interface IContactDocument extends IContactMessage, Document {
  createdAt: Date;
}

const ContactSchema: Schema = new Schema<IContactDocument>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: 2,
      maxlength: 80,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      maxlength: 100,
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
      minlength: 3,
      maxlength: 120,
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      minlength: 10,
      maxlength: 2500,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export const Contact = mongoose.model<IContactDocument>('Contact', ContactSchema);

