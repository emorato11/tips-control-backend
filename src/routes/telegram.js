import { Router } from 'express'

import { initBot } from '../controllers/telegram.js'

export const createTelegramRouter = () => {
  const telegramRouter = Router()

  telegramRouter.get('/init', async (req, res) => {
    const result = await initBot()

    res.json({message: result})
  })

  return telegramRouter
}
