import { app } from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoUser = process.env.MONGO_USER;
const mongoPass = process.env.MONGO_PASS;

mongoose.connect(`mongodb://localhost:27017`, {
  maxPoolSize: 10,
  user: mongoUser,
  pass: mongoPass,
  autoCreate: true,
  
})

app.listen(3333, () => console.log('Server is running!'));