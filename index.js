import express from "express";

import { corsMiddleware } from "./src/middlewares/cors.js";
import { createTipRouter } from "./src/routes/tips.js";
import { createAuthRouter } from "./src/routes/auth.js";
import { createTelegramRouter } from "./src/routes/telegram.js";
import { createAWSRouter } from "./src/routes/aws.js";
import { createTipstersRouter } from "./src/routes/tipster.js";
import { connectDB } from "./src/utils/dbConnection.js";
import { TipModel } from "./src/models/tip.js";
import { TipsterModel } from "./src/models/tipster.js";
import { UserModel } from "./src/models/user.js";
// import { initBot } from "./src/controllers/telegram.js";
// import { initCronJob } from "./src/jobs/index.js";
import { authenticateToken } from "./src/middlewares/auth.js";

// export const createApp = async ({ tipModel, tipsterModel, userModel }) => {
const app = express();
app.use(corsMiddleware);
app.use(express.json());
app.options("*", corsMiddleware);

const port = process.env.PORT ?? 1234;

await connectDB();

app.use("/auth", createAuthRouter({ userModel: UserModel }));
app.use("/tips", authenticateToken, createTipRouter({ tipModel: TipModel }));
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

// createApp({
//   tipModel: TipModel,
//   tipsterModel: TipsterModel,
//   userModel: userModel: ,
// });

export default app;
