import cron from 'node-cron'
import { getAllObjects } from '../controllers/aws.js'


export const initCronJob = () => {
  //0 9-23,0-1 * * * => desde las 12 a la 1, y de las 9 a las 23
  const scheduledJobFunction = cron.schedule("* * * * *", async () => {
    console.log("I'm executed on a schedule!");
    await getAllObjects()
  });
  
  scheduledJobFunction.start();
  
}
