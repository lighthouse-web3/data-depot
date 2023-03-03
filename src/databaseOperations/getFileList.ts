import dbbClient from './ddbClient'
import { carRecordTable } from '../utils/constants'
import { DatabaseError } from '../errors'

export default async (pageNo: number) => {
  try {
    let records = null
    let count = 0
    let exclusiveStartKey = null
    if (pageNo < 1) {
      throw new DatabaseError()
    }
    do {
      const params: any = {
        TableName: carRecordTable,
        Limit: 2,
        ExclusiveStartKey: exclusiveStartKey,
      }

      records = await dbbClient.scan(params)
      count += 1
      exclusiveStartKey = records.LastEvaluatedKey
      if (!exclusiveStartKey && pageNo > count) {
        records = {
          Items: [],
        }
        break
      }
    } while (count !== pageNo)
    return records.Items ?? []
  } catch (error) {
    console.log(error)
    throw new DatabaseError()
  }
}
