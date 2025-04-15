import { Schema } from 'mongoose'
const selectionSchema = new Schema({
  name: String,
  status: String
})

selectionSchema.set('toJSON', {
  transform: (_/* document */, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const tipSchema = new Schema({
  tipsterId: {
    type: String,
    required: [true, 'Tipster id is required']
  },
  tipsterName: {
    type: String,
    required: [true, 'Tipster name is required']
  },
  date: {
    type: Date,
    required: [true, 'Tip date is required'],
    min: '2023-01-01'
  },
  name: String,
  type: {
    type: String,
    required: [true, 'Type is required']
  },
  status: String,
  spent: {
    type: Number,
    min: 0
  },
  userId: String,
  potentialReturn: {
    type: Number,
    min: 0
  },
  selections: [selectionSchema]
})

// Hacemos esto para que, al devolver cada elemento de tipo 'Movie', reemplace el parámetro "_id" por "id" y borre "__v", que no queremos
tipSchema.set('toJSON', {
  transform: (_/* document */, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export {
  tipSchema
}
