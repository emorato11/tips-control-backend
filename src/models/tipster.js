import mongoose from 'mongoose'

import { tipsterSchema } from '../schemas/tipsters.js'

const { model } = mongoose

const Tipster = model('Tipster', tipsterSchema)

export class TipsterModel {
  static getAll = async ({ userId }) => {
    try {
      const result = await Tipster.find({ userId })
      return result
    } catch (error) {
      console.log(error)
    } finally {
      // mongoose.connection.close()
    }
  }

  static getById = async ({ id, userId }) => {
    try {
      const result = await Tipster.find({ id, userId})
      return result
    } catch (error) {
      return error
    } finally {
      // mongoose.connection.close()
    }
  }

  static create = async ({ input }) => {
    const newTipster = new Tipster({ ...input })

    try {
      const result = await newTipster.save()
      return result
    } catch (error) {
      console.log('create error', error)
    } finally {
      // mongoose.connection.close()
    }
  }

  static delete = async ({ id }) => {
    try {
      const result = await Tipster.findByIdAndDelete(id)
      return result
    } catch (error) {
      return error
    }
  }

  static update = async ({ id, input }) => {
    try {
      const result = await Tipster.findByIdAndUpdate(id, input, { new: true })
      return result
    } catch (error) {
      return error
    }
  }
}
