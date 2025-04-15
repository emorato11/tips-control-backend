import mongoose from "mongoose";

import { paymentSchema } from "../schemas/payments.js";

const { model } = mongoose;

const Payment = model("Payment", paymentSchema);

export class PaymentModel {
  static getAll = async ({ userId }) => {
    try {
      const result = await Payment.find({ userId }).sort({ date: -1 });
      return result;
    } catch (error) {
      console.log(error);
    } finally {
      // mongoose.connection.close()
    }
  };

  static getById = async ({ id, userId }) => {
    try {
      const result = await Payment.find({ tipsterId: id, userId }).sort({
        date: -1,
      });
      return result;
    } catch (error) {
      return error;
    } finally {
      // mongoose.connection.close()
    }
  };

  static create = async ({ input }) => {
    const newPayment = new Payment({ ...input });

    try {
      const result = await newPayment.save();
      return result;
    } catch (error) {
      console.log("create error", error);
    } finally {
      // mongoose.connection.close()
    }
  };

  static delete = async ({ id }) => {
    try {
      const result = await Payment.findByIdAndDelete(id);
      return result;
    } catch (error) {
      return error;
    }
  };

  static update = async ({ id, input }) => {
    try {
      const result = await Payment.findByIdAndUpdate(id, input, { new: true });
      return result;
    } catch (error) {
      return error;
    }
  };
}
