import mongoose from "mongoose";

import { tipSchema } from "../schemas/tips.js";

const { model } = mongoose;

const Tip = model("Tip", tipSchema);

export class TipModel {
  static getAll = async ({ userId }) => {
    try {
      const result = await Tip.find({ userId }).sort({ date: -1 });
      return result;
    } catch (error) {
      console.log(error);
    } finally {
      // mongoose.connection.close()
    }
  };

  static getAllByTipsterId = async ({ userId, tipsterId }) => {
    try {
      const result = await Tip.find({ userId, tipsterId }).sort({ date: -1 });
      return result;
    } catch (error) {
      console.log(error);
    } finally {
      // mongoose.connection.close()
    }
  };

  static getById = async ({ id, userId }) => {
    try {
      const result = await Tip.find({ id, userId });
      return result;
    } catch (error) {
      return error;
    } finally {
      // mongoose.connection.close()
    }
  };

  static create = async ({ input }) => {
    const newTip = new Tip({ ...input });

    try {
      const result = await newTip.save();
      return result;
    } catch (error) {
      console.log("create error", error);
    } finally {
      // mongoose.connection.close()
    }
  };

  static delete = async ({ id }) => {
    try {
      const result = await Tip.findByIdAndDelete(id);
      return result;
    } catch (error) {
      return error;
    }
  };

  static update = async ({ id, input }) => {
    try {
      const result = await Tip.findByIdAndUpdate(id, input, { new: true });
      return result;
    } catch (error) {
      return error;
    }
  };
}
