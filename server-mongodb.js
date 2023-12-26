import { TipModel } from './models/tip.js'
import { TipsterModel } from './models/tipster.js'

import { createApp } from './index.js'

createApp({ tipModel: TipModel, tipsterModel: TipsterModel })
