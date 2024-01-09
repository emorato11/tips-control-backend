import 'dotenv/config'

import mongoose from 'mongoose'

const URI_STRING = 'mongodb+srv://quiquemorato:Pnavarro.1@cluster0.pmfa3od.mongodb.net/db-tipster?retryWrites=true&w=majority'

const connectionString = process.env.DATABASE_URL_MONGO ?? URI_STRING

export const connectDB = async () => {
  try {
    await mongoose.connect(connectionString)
    console.log('Connect to MongoDB successfully')
  } catch (error) {
    console.log('Connect failed ' + error)
  }
}
