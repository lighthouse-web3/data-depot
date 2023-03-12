import fs from 'fs'
import chalk from 'chalk'
import config from '../../../config'
import { uploadS3 } from './uploadS3'
import { execute } from '../../../utils/execute'
import updateFileRecord from '../../../databaseOperations/updateFileRecord'

export const createCar = async (fileId: string, fileName: string) => {
  const log = console.log
  try {
    // Create CAR
    const nameFormat = fileName.replace(/ /g, '\\ ')
    const uploadPathFormat = config.uploadPath.replace(/ /g, '\\ ')
    const carPathFormat = config.carPath.replace(/ /g, '\\ ')
    const car: any = await execute(
      `generate-car --single -i ${uploadPathFormat}/${fileId}/${nameFormat} -o ${carPathFormat} -p ${uploadPathFormat}/${fileId}`
    )
    const jsonResponse = JSON.parse(car)
    const carSize: any = await execute(
      `stat --format="%s" ${carPathFormat}/${jsonResponse['PieceCid']}.car`
    )
    // // Push CAR to S3
    const pushToS3 = await uploadS3(jsonResponse['PieceCid'])
    if(!pushToS3){
      throw new Error("Failed to save file to s3")
    }

    // Create DB record
    const _ = await updateFileRecord({
      id: fileId,
      payloadCid: jsonResponse['DataCid'],
      pieceCid: jsonResponse['PieceCid'],
      carSize: parseInt(carSize.trim()),
      pieceSize: jsonResponse['PieceSize'],
      fileStatus: 'CAR Created',
    })

    // Remove Uploaded file
    fs.rmSync(`${config.uploadPath}/${fileId}`, { recursive: true })
    // Remove car file from disk
    fs.rmSync(`${config.carPath}/${jsonResponse['PieceCid']}.car`, { recursive: true })
    return
  } catch (error) {
    log(chalk.red('Error creating car: ') + error)
    return
  }
}
