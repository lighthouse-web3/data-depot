import dbbClient from './ddbClient'
import { carRecordTable } from '../utils/constants'
import { DatabaseError } from '../errors'
import { fileStatusUpdate } from './types'

export default async (updatedDetails: fileStatusUpdate) => {
  try {
    const params = {
      TableName: carRecordTable,
      Key: {
        id: updatedDetails.id,
      },
      UpdateExpression:
        'set #fileStatus = :f, #lastUpdate = :l',
      ExpressionAttributeValues: {
        ':f': updatedDetails.fileStatus,
        ':l': Date.now(),
      },
      ExpressionAttributeNames: {
        '#fileStatus': 'fileStatus',
        '#lastUpdate': 'lastUpdate',
      },
    }

    await dbbClient.update(params)
    return 'Put Successful'
  } catch (error) {
    console.log(error)
    throw new DatabaseError()
  }
}
