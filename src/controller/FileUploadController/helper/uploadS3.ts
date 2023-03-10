import fs from 'fs'
import chalk from 'chalk'
import config from '../../../config'
import { s3Connect } from './s3Connect'
import { carFileBucket } from '../../../utils/constants'

export const uploadS3 = async (pieceCID: string, fileId: string) => {
  const log = console.log
  try {
    const s3 = await s3Connect();
    if(!s3){
      throw new Error()
    }

    const fileStream = fs.createReadStream(`${config.carPath}/${pieceCID}.car`)

    const uploadParams = {
      Bucket: carFileBucket,
      Key: `${fileId}.car`,
      Body: fileStream
    }
    const data = await s3.upload(uploadParams as any).promise()
    log(chalk.greenBright("File pushed to bucket:") + data.Location)
    return "Success"
  } catch (error) {
    log(chalk.red('Error creating car: ') + error)
    return null
  }
}
