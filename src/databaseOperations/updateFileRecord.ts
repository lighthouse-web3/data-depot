import dbbClient from './ddbClient'
import { carRecordTable } from '../utils/constants'
import { DatabaseError } from '../errors'

export default async (details: any) => {
  try {
    const params = {
      TableName: carRecordTable,
      Key: {
        id: details.id,
      },
      UpdateExpression:
        'set #fileStatus = :f, #payloadCid = :p, #pieceCid = :pi, #pieceSize = :ps, #carSize = :cs, #lastUpdate = :l',
      ExpressionAttributeValues: {
        ':f': details.fileStatus,
        ':p': details.payloadCid,
        ':pi': details.pieceCid,
        ':ps': details.pieceSize,
        ':cs': details.carSize,
        ':l': Date.now(),
      },
      ExpressionAttributeNames: {
        '#fileStatus': 'fileStatus',
        '#payloadCid': 'payloadCid',
        '#pieceCid': 'pieceCid',
        '#pieceSize': 'pieceSize',
        '#carSize': 'carSize',
        '#lastUpdate': 'lastUpdate',
      },
    }

    await dbbClient.update(params)
    return 'Update Successful'
  } catch (error) {
    console.log(error)
    throw new DatabaseError()
  }
}
