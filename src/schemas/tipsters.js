import { Schema } from "mongoose";

const tipsterSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  description: String,
  type: {
    type: String,
    required: [true, "Type is required"],
  },
  userId: String,
});

// Hacemos esto para que, al devolver cada elemento de tipo 'Movie', reemplace el parámetro "_id" por "id" y borre "__v", que no queremos
tipsterSchema.set("toJSON", {
  transform: (_ /* document */, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export { tipsterSchema };
