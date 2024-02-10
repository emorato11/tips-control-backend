import TelegramBot from "node-telegram-bot-api";
import 'dotenv/config'
import { unlink } from "fs";
import { streamToBufferAsync } from "../utils/buffer.js"
import { uploadFileToBucket } from "./aws.js"

const tToken = process.env.TELEGRAM_TOKEN
let bot = undefined;
let chatId = undefined

export const init = async (token = tToken) => {
  bot = new TelegramBot(token, {polling: true});

  initBotListeners()

  return true
};

const initBotListeners = () => {
  bot?.onText(/\/start/, (msg) => {
    console.log('On Text')
    chatId = msg.chat.id;

    bot?.sendMessage(chatId, "Bienvenido!")

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
      
      await prepareStreamToUpload({stream, photoName, mimetype, caption: msg.caption})

    }
  });

}

const prepareStreamToUpload = async ({stream, photoName, mimetype, caption}) => {
  const buffer = await streamToBufferAsync({stream})

  await uploadFileToBucket({ originalname: photoName, mimetype, buffer, caption })
}