import mongoose from 'mongoose';

let isConnected = false;
let reconnectInterval: NodeJS.Timeout | null = null;

// Sanitize MongoDB URI in case special characters in password are not URL encoded
const formatMongoUri = (rawUri: string): string => {
  // If uri has format mongodb+srv://username:password@cluster
  const match = rawUri.match(/^(mongodb(?:\+srv)?:\/\/)([^:]+):(.*)@([^@/]+)(\/.*)?$/);
  if (match) {
    const [, protocol, username, password, host, rest = ''] = match;
    // Decode first in case already partially encoded, then encode
    const safePassword = password ? encodeURIComponent(decodeURIComponent(password)) : '';
    return `${protocol}${username}:${safePassword}@${host}${rest}`;
  }
  return rawUri;
};

export const connectDB = async (): Promise<boolean> => {
  const rawUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1/manish_portfolio';
  const uri = formatMongoUri(rawUri);

  if (mongoose.connection.readyState === 1) {
    isConnected = true;
    return true;
  }

  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: parseInt(process.env.MONGODB_TIMEOUT_MS || '5000'),
      connectTimeoutMS: 6000,
      // autoReconnect is not a valid option in newer Mongoose versions
      maxPoolSize: 10,
      bufferCommands: false,
    });
    isConnected = true;
    console.log(`[MongoDB] Connected successfully to Atlas cluster: ${mongoose.connection.host}/${mongoose.connection.name}`);
    console.log(`[MongoDB] Database name: ${mongoose.connection.name}`);
    
    if (reconnectInterval) {
      clearInterval(reconnectInterval);
      reconnectInterval = null;
    }
    return true;
  } catch (error: any) {
    isConnected = false;
    const msg = error?.message || String(error);

    if (msg.includes('whitelist') || msg.includes('Could not connect to any servers')) {
      console.warn('⚠️ [MongoDB Atlas] Connection Blocked: Your IP address is not yet whitelisted in Atlas.');
      console.warn('👉 Fix: Go to MongoDB Atlas -> Network Access -> Click "Add IP Address" -> Select "Allow Access from Anywhere" (0.0.0.0/0) -> Confirm.');
    } else if (msg.includes('bad auth') || msg.includes('Authentication failed')) {
      console.warn('⚠️ [MongoDB Atlas] Authentication Failed: Database username or password is incorrect.');
    } else {
      console.warn(`[MongoDB] Connection notice: ${msg}`);
    }

    // Schedule background retry so it auto-connects when IP is whitelisted
    if (!reconnectInterval) {
      reconnectInterval = setInterval(async () => {
        if (!isDbConnected()) {
          console.log('[MongoDB] Retrying connection in background...');
          await connectDB();
        }
      }, 12000);
    }

    return false;
  }
};

export const isDbConnected = (): boolean => {
  return mongoose.connection.readyState === 1;
};

mongoose.connection.on('disconnected', () => {
  isConnected = false;
  console.log('[MongoDB] Connection lost');
});

mongoose.connection.on('reconnected', () => {
  isConnected = true;
  console.log('[MongoDB] Reconnected');
});
