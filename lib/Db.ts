import mongoose, { Connection } from 'mongoose';

let cachedConnection: Connection | null = null;

const connectionString = process.env.MONGODB_URI!;

export async function Db() {
  if (cachedConnection) {
    console.log('Using cached db connection');
    return cachedConnection;
  }
  try {
    const cnx = await mongoose.connect(connectionString);
    cachedConnection = cnx.connection;
    console.log('New mongodb connection established');
    return cachedConnection;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
