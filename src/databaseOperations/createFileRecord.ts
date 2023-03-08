import dbbClient from './ddbClient'
import { carRecordTable } from '../utils/constants'
import { DatabaseError } from '../errors'
import { fileRecord } from './types'

export default async (record: fileRecord) => {
  try {
    const params = {
      TableName: carRecordTable,
      Item: record,
    }

    await dbbClient.put(params)
    return 'Put Successful'
  } catch (error) {
    console.log(error)
    throw new DatabaseError()
  }
}
