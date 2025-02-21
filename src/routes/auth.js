import { Router } from "express";

import { UserController } from "../controllers/user.js";
import { authenticateToken } from "../middlewares/auth.js";

export const createAuthRouter = ({ userModel }) => {
  const authRouter = Router();

  const userController = new UserController({ userModel });

  authRouter.post("/", userController.login);
  authRouter.get("/recover", authenticateToken, userController.recoverUserData);

  return authRouter;
};
