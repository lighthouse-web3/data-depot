import dbbClient from './ddbClient'
import { carRecordTable } from '../utils/constants'
import { DatabaseError } from '../errors'

export default async (fileId: any) => {
  try {
    const params = {
      TableName: carRecordTable,
      Key: {
        id: fileId,
      },
    }

    const record = await dbbClient.get(params)
    return record.Item
  } catch (error) {
    console.log(error)
    throw new DatabaseError()
  }
}
