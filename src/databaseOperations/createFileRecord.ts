import dbbClient from './ddbClient'
import { carRecordTable } from '../utils/constants'
import { DatabaseError } from '../errors'

export default async (record: any) => {
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
