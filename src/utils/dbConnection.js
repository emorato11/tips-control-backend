import 'dotenv/config'

import mongoose from 'mongoose'

const connectionString = process.env.DATABASE_URL_MONGO

export const connectDB = async () => {
  try {
    await mongoose.connect(connectionString)
    console.log('Connect to MongoDB successfully')
  } catch (error) {
    console.log('Connect failed ' + error)
  }
}
