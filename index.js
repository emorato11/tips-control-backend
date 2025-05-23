import express from "express";

import { corsMiddleware } from "./src/middlewares/cors.js";
import { createTipRouter } from "./src/routes/tips.js";
import { createPaymentRouter } from "./src/routes/payments.js";
import { createGroupRouter } from "./src/routes/groups.js";
import { createAuthRouter } from "./src/routes/auth.js";
import { createTelegramRouter } from "./src/routes/telegram.js";
import { createAWSRouter } from "./src/routes/aws.js";
import { createTipstersRouter } from "./src/routes/tipster.js";
import { createYieldRouter } from "./src/routes/yield.js";
import { connectDB } from "./src/utils/dbConnection.js";
import { TipModel } from "./src/models/tip.js";
import { PaymentModel } from "./src/models/payment.js";
import { GroupModel } from "./src/models/group.js";
import { TipsterModel } from "./src/models/tipster.js";
import { UserModel } from "./src/models/user.js";
// import { initBot } from "./src/controllers/telegram.js";
// import { initCronJob } from "./src/jobs/index.js";
import { authenticateToken } from "./src/middlewares/auth.js";

const app = express();
app.use(corsMiddleware);
app.use(express.json());
app.options("*", corsMiddleware);

const port = process.env.PORT ?? 1234;

await connectDB();

app.use("/auth", createAuthRouter({ userModel: UserModel }));
app.use("/tips", authenticateToken, createTipRouter({ tipModel: TipModel }));
app.use(
  "/payments",
  authenticateToken,
  createPaymentRouter({ paymentModel: PaymentModel })
);
app.use(
  "/groups",
  authenticateToken,
  createGroupRouter({ groupModel: GroupModel })
);
app.use(
  "/yield",
  authenticateToken,
  createYieldRouter({
    paymentModel: PaymentModel,
    tipModel: TipModel,
    tipsterModel: TipsterModel,
  })
);
app.use(
  "/tipsters",
  authenticateToken,
  createTipstersRouter({ tipsterModel: TipsterModel })
);
app.use("/telegram", createTelegramRouter());
app.use("/aws", createAWSRouter());

// La última opcion a la que entraría (para controlar error, por ej)
app.use((req, res) => {
  res.status(404).send("<h1>404 No se encontró la página</h1>");
});

if (process.env.NODE_ENV !== "production") {
  app.listen(port, async () => {
    //   // await initBot();
    //   // await initCronJob();
    console.log(`server listening on port http://localhost:${port}`);
  });
}

export default app;
