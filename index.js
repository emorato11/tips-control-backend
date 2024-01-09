import express from 'express'

import { corsMiddleware } from './src/middlewares/cors.js'
import { createTipRouter } from './src/routes/tips.js'
import { createTipstersRouter } from './src/routes/tipster.js'
import { connectDB } from './src/utils/dbConnection.js'
import { TipModel } from './src/models/tip.js'
import { TipsterModel } from './src/models/tipster.js'

export const createApp = async ({ tipModel, tipsterModel }) => {
  const app = express()
  app.use(express.json())
  app.use(corsMiddleware())
  const port = process.env.PORT ?? 1234

  await connectDB()

  app.use('/tips', createTipRouter({ tipModel }))
  app.use('/tipsters', createTipstersRouter({ tipsterModel }))

  // La última opcion a la que entraría (para controlar error, por ej)
  app.use((req, res) => {
    res.status(404).send('<h1>404 No se encontró la página</h1>')
  })

  app.listen(port, () => {
    console.log(`server listening on port http://localhost:${port}`)
  })
}

createApp({ tipModel: TipModel, tipsterModel: TipsterModel })
