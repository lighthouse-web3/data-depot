import fs from 'fs'
import chalk from 'chalk'
import { execute } from '../../../utils/execute'
import updateFileRecord from '../../../databaseOperations/updateFileRecord'

export const createCar = async (fileId: any) => {
  const log = console.log
  try {
    const car: any = await execute(
      `generate-car --single -i ${process.cwd()}/uploads/${fileId} -o ${process.cwd()}/carGenerated -p ${process.cwd()}`
    )
    const jsonResponse = JSON.parse(car)
    const _ = await updateFileRecord({
      id: fileId,
      payloadCid: jsonResponse['DataCid'],
      pieceCid: jsonResponse['PieceCid'],
      pieceSize: jsonResponse['PieceSize'],
      fileStatus: 'CAR Created',
    })

    // Remove Uploaded file
    fs.rmSync(`${process.cwd()}/uploads/${fileId}`, { recursive: true })
    return
  } catch (error) {
    log(chalk.red('Error creating car: ') + error)
    return
  }
}
