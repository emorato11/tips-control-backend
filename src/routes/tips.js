import { Router } from 'express'

import { TipController } from '../controllers/tips.js'

export const createTipRouter = ({ tipModel }) => {
  const tipsRouter = Router()

  const tipController = new TipController({ tipModel })

  tipsRouter.get('/', tipController.getAll)
  tipsRouter.get('/:id', tipController.getById)
  tipsRouter.post('/', tipController.create)
  tipsRouter.patch('/:id', tipController.update)
  tipsRouter.delete('/:id', tipController.delete)

  return tipsRouter
}
