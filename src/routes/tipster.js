import { Router } from 'express'

import { TipsterController } from '../controllers/tipster.js'

export const createTipstersRouter = ({ tipsterModel }) => {
  const tipsterRouter = Router()

  const tipsterController = new TipsterController({ tipsterModel })

  tipsterRouter.get('/', tipsterController.getAll)
  tipsterRouter.get('/:id', tipsterController.getById)
  tipsterRouter.post('/', tipsterController.create)
  tipsterRouter.patch('/:id', tipsterController.update)
  tipsterRouter.delete('/:id', tipsterController.delete)

  return tipsterRouter
}
