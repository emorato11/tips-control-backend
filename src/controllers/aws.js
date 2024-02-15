import { getAllObjects as getAll, getObject, deleteObject as deleteSingleObject } from "../models/aws.js"
import { TipModel } from "../models/tip.js"
import { sendTextMessage } from "../models/telegram.js"
import { handleRecognizeImage } from '../utils/imageText.js'

export async function getAllObjects () {
  const paths = await getAll()

  // El resultado es una lista de paths de los archivos de la carpeta uploads del bucket,
  // con ello, llamamos al getSingleObject() por cada uno de los paths, y creamos los tips
  // en base de datos
  let tips = []

  try {
    for (const filePath of paths) {
      const tip = await getSingleObject({filePath})
    
      await TipModel.create({input: tip})
      tips = [...tips, tip]
  
      await deleteObject({path: filePath})

      sendTextMessage('Foto borrada del bucket y Tip añadido')
    }
  
    // console.log('paths: ', paths)
    // console.log('tips: ', tips)
  } catch (error) {
    console.error('error en el controller de AWS: ', error)
  }

  return tips
}

export async function getSingleObject ({filePath}) {
  const { buffer, metadata} = await getObject({filePath})

  const tipFromImage = await handleRecognizeImage({buffer, tipster: metadata.tipster, type: metadata.type})

  return tipFromImage
}

export async function deleteObject ({path}) {
  const response = await deleteSingleObject({path})

  return response
}