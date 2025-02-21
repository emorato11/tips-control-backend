import { Schema } from "mongoose";

const userSchema = new Schema({
  id: { type: String, unique: true, required: true }, // ID único de Google
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  profilePicture: { type: String },
  createdAt: { type: Date, default: Date.now },
});

userSchema.set("toJSON", {
  transform: (_ /* document */, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export { userSchema };
