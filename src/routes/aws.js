import { Router } from 'express'

import { getAllObjects, getSingleObject } from '../controllers/aws.js'
import { initCronJob } from '../jobs/index.js'


export const createAWSRouter = () => {
  const awsRouter = Router()

  awsRouter.get('/start-sync', async (req, res) => {
    initCronJob(res)

    res.json({message: 'cron job started'})
  })

  awsRouter.get('/get-all', async (req, res) => {
    const result = await getAllObjects()

    if (result) {
      res.json(result)
    }
  })

  awsRouter.get('/get-single', async (req, res) => {
    const result = await getSingleObject()

    if (result) {
      res.json(result)
    }
  })

  return awsRouter
}
