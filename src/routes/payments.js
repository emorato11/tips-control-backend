import { Router } from "express";

import { PaymentController } from "../controllers/payment.js";

export const createPaymentRouter = ({ paymentModel }) => {
  const paymentssRouter = Router();

  const paymentController = new PaymentController({ paymentModel });

  paymentssRouter.get("/", paymentController.getAll);
  paymentssRouter.get("/:id", paymentController.getById);
  paymentssRouter.post("/", paymentController.create);
  paymentssRouter.patch("/:id", paymentController.update);
  paymentssRouter.delete("/:id", paymentController.delete);

  return paymentssRouter;
};
