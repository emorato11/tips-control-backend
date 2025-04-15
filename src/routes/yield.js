import { Router } from "express";

import { YieldController } from "../controllers/yield.js";

export const createYieldRouter = ({ paymentModel, tipModel, tipsterModel }) => {
  const yieldRouter = Router();

  const yieldController = new YieldController({
    paymentModel,
    tipModel,
    tipsterModel,
  });

  yieldRouter.get("/", yieldController.getAll);
  yieldRouter.get("/:id", yieldController.getById);

  return yieldRouter;
};
