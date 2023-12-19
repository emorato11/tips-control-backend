import 'dotenv/config'
import mongoose from 'mongoose'

import { tipSchema } from '../schemas/tips.js'

const { model } = mongoose

const URI_STRING = 'mongodb+srv://quiquemorato:Pnavarro.1@cluster0.pmfa3od.mongodb.net/db-tipster?retryWrites=true&w=majority'

const connectionString = process.env.DATABASE_URL_MONGO ?? URI_STRING

const connectDB = async () => {
  try {
    await mongoose.connect(connectionString)
    console.log('Connect to MongoDB successfully')
  } catch (error) {
    console.log('Connect failed ' + error)
  }
}

connectDB()

const Tip = model('Tip', tipSchema)

export class TipModel {
  static getAll = async () => {
    try {
      const result = await Tip.find()
      return result
    } catch (error) {
      console.log(error)
    } finally {
      // mongoose.connection.close()
    }
  }

  static getById = async ({ id }) => {
    try {
      const result = await Tip.findById(id)
      return result
    } catch (error) {
      return error
    } finally {
      // mongoose.connection.close()
    }
  }

  static create = async ({ input }) => {
    const newTip = new Tip({ ...input })

    try {
      const result = await newTip.save()
      return result
    } catch (error) {
      console.log('create error', error)
    } finally {
      // mongoose.connection.close()
    }
  }

  static delete = async ({ id }) => {
    try {
      const result = await Tip.findByIdAndDelete(id)
      return result
    } catch (error) {
      return error
    }
  }

  static update = async ({ id, input }) => {
    try {
      const result = await Tip.findByIdAndUpdate(id, input, { new: true })
      return result
    } catch (error) {
      return error
    }
  }
}
