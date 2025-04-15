import { Schema } from "mongoose";

const paymentSchema = new Schema({
  tipsterId: {
    type: String,
    required: [true, "Tipster Id is required"],
  },
  tipsterName: {
    type: String,
    required: [true, "Tipster Name is required"],
  },
  date: {
    type: Date,
    required: [true, "Date is required"],
    min: "2023-01-01",
  },
  name: String,
  description: String,
  spent: {
    type: Number,
    min: 0,
  },
  typeId: String,
  typeName: String,
  userId: String,
});

paymentSchema.set("toJSON", {
  transform: (_ /* document */, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export { paymentSchema };
