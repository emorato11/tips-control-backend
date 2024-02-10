import { getAllObjects as getAll, getObject, deleteObject as deleteSingleObject } from "../models/aws.js"
import {TipModel} from "../models/tip.js"
import { handleRecognizeImage } from '../utils/imageText.js'

export async function getAllObjects () {
  const result = await getAll()

  // El resultado es una lista de paths de los archivos de la carpeta uploads del bucket,
  // con ello, llamamos al getSingleObject() por cada uno de los paths, y creamos los tips
  // en base de datos
  const tips = []
  result?.forEach(async (filePath) => {
    const tip = await getSingleObject({filePath})

    console.log(tip)
    // Solo falta crear el tip en base de datos (Tip.create(tip))
    await TipModel.create({input: tip})
    tips.push(tip)
    await deleteObject({path: filePath})
  })

  console.log('result: ', result)

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