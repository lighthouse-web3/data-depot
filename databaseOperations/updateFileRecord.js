const dbbClient = require('./ddbClient')
const { carRecordTable } = require('../utils/constants')
const { DatabaseError } = require('../errors')

module.exports = async (details) => {
  try {
    const params = {
      TableName: carRecordTable,
      Key: {
        id: details.id,
      },
      UpdateExpression:
        'set #fileStatus = :f, #payloadCid = :p, #pieceCid = :pi, #pieceSize = :ps, #lastUpdate = :l',
      ExpressionAttributeValues: {
        ':f': details.fileStatus,
        ':p': details.payloadCid,
        ':pi': details.pieceCid,
        ':ps': details.pieceSize,
        ':l': Date.now(),
      },
      ExpressionAttributeNames: {
        '#fileStatus': 'fileStatus',
        '#payloadCid': 'payloadCid',
        '#pieceCid': 'pieceCid',
        '#pieceSize': 'pieceSize',
        '#lastUpdate': 'lastUpdate',
      },
    }

    await dbbClient.update(params).promise()
    return 'Update Successful'
  } catch (error) {
    console.log(error)
    throw new DatabaseError()
  }
}
