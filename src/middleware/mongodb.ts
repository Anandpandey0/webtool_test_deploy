import mongoose, { Mongoose } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import config from '../config/config';

const mongodbURI = config.mongodb.uri;

if (!mongodbURI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Extend the global object to include a cache for mongoose
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache;
}

// Check if the global object already has a mongoose cache, if not, initialize it
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase(req: NextApiRequest, res: NextApiResponse, next: Function) {
  if (cached.conn) {
    return next();
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(mongodbURI).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return next();
}

export default connectToDatabase;
