import mongoose from "mongoose";

import { groupsSchema } from "../schemas/groups.js";

const { model } = mongoose;

const Group = model("Group", groupsSchema);

export class GroupModel {
  static getAll = async ({ userId }) => {
    try {
      const result = await Group.find({ userId }).sort({ date: -1 });
      return result;
    } catch (error) {
      console.log(error);
    } finally {
      // mongoose.connection.close()
    }
  };

  static getAllByTipsterId = async ({ userId, tipsterId }) => {
    try {
      const result = await Group.find({ userId, tipsterId }).sort({ date: -1 });
      return result;
    } catch (error) {
      console.log(error);
    } finally {
      // mongoose.connection.close()
    }
  };

  static getById = async ({ id, userId }) => {
    try {
      const result = await Group.find({ id, userId });
      return result;
    } catch (error) {
      return error;
    } finally {
      // mongoose.connection.close()
    }
  };

  static create = async ({ input }) => {
    const newGroup = new Group({ ...input });

    try {
      const result = await newGroup.save();
      return result;
    } catch (error) {
      console.log("create error", error);
    } finally {
      // mongoose.connection.close()
    }
  };

  static update = async ({ id, input }) => {
    try {
      const result = await Group.findByIdAndUpdate(id, input, { new: true });
      return result;
    } catch (error) {
      return error;
    }
  };
}
