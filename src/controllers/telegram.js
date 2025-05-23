import { init, sendTextMessage } from "../models/telegram.js"

export async function initBot () {
  const result = await init()

  return result
}

export function sendText (message) {
  sendTextMessage(message)
}