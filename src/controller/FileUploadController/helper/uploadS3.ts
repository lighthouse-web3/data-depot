import fs from 'fs'
import chalk from 'chalk'
import { s3Connect } from './s3Connect'

export const uploadS3 = async (pieceCID: string) => {
  const log = console.log
  try {
    const s3 = await s3Connect();
    if(!s3){
      throw new Error()
    }

    const fileStream = fs.createReadStream(`${process.cwd()}/carGenerated/${pieceCID}`)
    fileStream.on('error', function(err: any) {
      throw new Error()
    })

    const uploadParams = {
      Key: pieceCID,
      Body: fileStream
    }
    const data = await s3.upload(uploadParams as any).promise();
    log(chalk.greenBright("File pushed to bucket") + data.Location)
    return "Success"
  } catch (error) {
    log(chalk.red('Error creating car: ') + error)
    return null
  }
}
