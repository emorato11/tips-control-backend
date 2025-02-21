import mongoose from "mongoose";

import { userSchema } from "../schemas/users.js";

const { model } = mongoose;

const User = model("User", userSchema);

export class UserModel {
  static getById = async ({ id }) => {
    try {
      console.log(id);
      const result = await User.findOne({ id });
      return result;
    } catch (error) {
      return error;
    } finally {
      // mongoose.connection.close()
    }
  };

  static create = async ({ input }) => {
    const newUser = new User({ ...input });

    try {
      const result = await newUser.save();
      return result;
    } catch (error) {
      console.log("create user error", error);
    } finally {
      // mongoose.connection.close()
    }
  };
}
