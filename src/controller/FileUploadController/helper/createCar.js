const fs = require('fs')
const chalk = require('chalk')
const { execute } = require('../../../utils/execute')
const updateFileRecord = require('../../../databaseOperations/updateFileRecord')

exports.createCar = async (fileId) => {
  const log = console.log
  try {
    const car = await execute(
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
