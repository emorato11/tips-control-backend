import { TipModel } from "./src/models/tip.js";
import { TipsterModel } from "./src/models/tipster.js";
import { UserModel } from "./src/models/user.js";

import { createApp } from "./index.js";

createApp({
  tipModel: TipModel,
  tipsterModel: TipsterModel,
  userModel: UserModel,
});
