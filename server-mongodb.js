import { TipModel } from './src/models/tip.js'
import { TipsterModel } from './src/models/tipster.js'

import { createApp } from './index.js'

createApp({ tipModel: TipModel, tipsterModel: TipsterModel })
