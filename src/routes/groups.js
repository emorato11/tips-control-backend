import { Router } from "express";

import { GroupController } from "../controllers/groups.js";

export const createGroupRouter = ({ groupModel }) => {
  const groupsRouter = Router();

  const groupsController = new GroupController({ groupModel });

  groupsRouter.get("/", groupsController.getAll);
  groupsRouter.get("/:tipsterId", groupsController.getAllByTipsterId);
  groupsRouter.post("/", groupsController.create);
  groupsRouter.patch("/:id", groupsController.update);

  return groupsRouter;
};
