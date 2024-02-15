import TelegramBot from "node-telegram-bot-api";
import 'dotenv/config'
import { streamToBufferAsync } from "../utils/buffer.js"
import { uploadFileToBucket } from "./aws.js"

const tToken = process.env.TELEGRAM_TOKEN
let bot;
let currentChatId = process.env.TELEGRAM_CHAT_ID;

export const init = async (token = tToken) => {
  // if (!hasConnected()) {
  bot = new TelegramBot(token, {polling: true});
  
  initBotListeners()

  sendTextMessage('Bot inicializado!!')
    
  return 'Starting bot!'
  // }

  // return 'Bot already initialized'
};

export const sendTextMessage = (message) => {
  bot?.sendMessage(currentChatId, message)
}

export const hasConnected = () => {
  return !!bot && bot.isPolling()
}

const initBotListeners = () => {
  bot?.onText(/\/start/, (msg) => {
    console.log('On Text')
    console.log(msg)

    bot?.sendMessage(msg.chat.id, `Bienvenido, ${msg.from.first_name} ${msg.from.last_name}!`)

  });
  // In case it's necessary to get photo, extract logic from document to other function 
  // bot?.on('photo', async (msg) => {
  //   if (msg.photo.length) {

  //     const stream = await bot?.getFileStream(msg.photo[msg.photo.length - 1].file_id)
      
  //     console.log('stream: ', stream)

  //     const buffer = await streamToBufferAsync({stream})
  //   }
  // });

  bot?.on('document', async (msg) => {
    console.log(msg)
    if (msg.document) {
      const stream = await bot?.getFileStream(msg.document.file_id)
      const photoName = msg.document.file_name
      const mimetype = msg.document.mime_type

      bot?.sendMessage(msg.chat.id, `Preparando fichero ${photoName} para subir a AWS`)
      
      await prepareStreamToUpload({stream, photoName, mimetype, caption: msg.caption})

      bot?.sendMessage(msg.chat.id, `Fichero subido!`)

    }
  });

}

const prepareStreamToUpload = async ({stream, photoName, mimetype, caption}) => {
  const buffer = await streamToBufferAsync({stream})

  await uploadFileToBucket({ originalname: photoName, mimetype, buffer, caption })
}