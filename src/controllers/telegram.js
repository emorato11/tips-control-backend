import { init } from "../models/telegram.js"

export async function initBot () {
  const result = await init()

  return result
}