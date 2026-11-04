import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Contact } from '../models/Contact.js';
import { connectDB } from '../config/db.js';

dotenv.config();

const viewMessages = async () => {
  try {
    await connectDB();
    const messages = await Contact.find().sort({ createdAt: -1 });

    console.log('\n======================================================');
    console.log(`📬 TOTAL MESSAGES IN MONGODB ATLAS: ${messages.length}`);
    console.log('======================================================\n');

    messages.forEach((msg, idx) => {
      console.log(`[#${idx + 1}] FROM: ${msg.name} <${msg.email}>`);
      console.log(`     DATE: ${msg.createdAt ? new Date(msg.createdAt).toLocaleString() : 'N/A'}`);
      console.log(`     SUBJECT: ${msg.subject}`);
      console.log(`     MESSAGE: "${msg.message}"`);
      console.log('------------------------------------------------------');
    });

    await mongoose.disconnect();
    process.exit(0);
  } catch (err: any) {
    console.error('Error fetching messages:', err.message);
    process.exit(1);
  }
};

viewMessages();

