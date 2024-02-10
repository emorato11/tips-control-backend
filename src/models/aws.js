import { S3Client, PutObjectCommand, ListObjectsV2Command, GetObjectCommand, DeleteObjectCommand, DeleteObjectsCommand } from "@aws-sdk/client-s3";
import { streamToBufferAsync } from "../utils/buffer.js"


const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID
const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
const awsRegion = process.env.AWS_REGION
const awsBucketName = process.env.AWS_BUCKET_NAME

const s3 = new S3Client({
  credentials: {
    accessKeyId: awsAccessKeyId,
    secretAccessKey: awsSecretAccessKey
  },
  region: awsRegion
});

export const uploadFileToBucket = async ({originalname, buffer, mimetype, caption}) => {
  const [tipster, type ] = caption.split(' - ')
  const metadata = {
    tipster,
    type
  }
  const params = {
    Bucket: awsBucketName,
    Key: `uploads/${originalname}`,
    Body: buffer,
    ContentType: mimetype,
    Metadata: metadata
  }

  const command = new PutObjectCommand(params)

  try {
    await s3.send(command)
    console.log('AWS res OK')
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export const getAllObjects = async () => {
  const command =  new ListObjectsV2Command({
    Bucket: awsBucketName,
    Prefix: 'uploads/',
    Delimiter: '/',
    // The default and maximum number of keys returned is 1000. This limits it to
    // one for demonstration purposes.
    MaxKeys: 20,
  });

  try {
    let isTruncated = true;

    let contents = [];

    while (isTruncated) {
      const { Contents, IsTruncated, NextContinuationToken } =
      await s3.send(command);
      if (!Contents?.length) {
        isTruncated = false;
      } else {
        const contentsList = Contents.map((c) => c.Key);
        contents = [...contents, ...contentsList]
        isTruncated = IsTruncated;
        command.input.ContinuationToken = NextContinuationToken;
      }
      
    }
    
    return contents
  } catch (err) {
    console.error(err);
  }
}

export const getObject = async ({filePath}) => {
  const params = {
    Bucket: awsBucketName,
    Key: filePath,
  };
  const command = new GetObjectCommand(params);
  const response = await s3.send(command);

  const { Body, Metadata } = response; 
  const buffer = await streamToBufferAsync({stream: Body})
  try {
    return { 
      buffer,
      metadata: Metadata
    }
  } catch (error) {
    console.log('error: ',error)
    return error
  }

}

export const deleteObjects = async ({pathsList}) => {
  const params = {
    Bucket: awsBucketName,
    Objects: pathsList.map(path => ({Key: path}))
  }

  console.log('params delete:', params)
  const command = new DeleteObjectsCommand(params)

  const response = await s3.send(command)

  return response
}

export const deleteObject = async ({path}) => {
  const params = {
    Bucket: awsBucketName,
    Key: path
  }

  const command = new DeleteObjectCommand(params)

  const response = await s3.send(command)

  return response
}


