import { app } from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoHost = process.env.MONGO_HOST;
const mongoUser = process.env.MONGO_USER;
const mongoPass = process.env.MONGO_PASS;

mongoose.connect(`mongodb://${mongoHost}`, {
  maxPoolSize: 10,
  user: mongoUser,
  pass: mongoPass,
  autoCreate: true,
  dbName: 'bovControl'  
})

app.listen(3333, () => console.log('Server is running!'));