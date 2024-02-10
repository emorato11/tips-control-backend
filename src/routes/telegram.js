import { Router } from 'express'

import { initBot } from '../controllers/telegram.js'

export const createTelegramRouter = () => {
  const telegramRouter = Router()

  telegramRouter.get('/init', async (req, res) => {
    const result = await initBot()

    if (result) res.json({message: 'Bot iniciado'})
  })

  return telegramRouter
}
