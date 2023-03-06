import dbbClient from './ddbClient'
import { unmarshall } from '@aws-sdk/util-dynamodb'
import { ScanCommand } from "@aws-sdk/client-dynamodb"
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
        Limit: 2000,
        ExclusiveStartKey: exclusiveStartKey,
      }

      records = await dbbClient.send(new ScanCommand(params))
      count += 1
      exclusiveStartKey = records.LastEvaluatedKey
      if (!exclusiveStartKey && pageNo > count) {
        records = {
          Items: [],
        }
        break
      }
    } while (count !== pageNo)
    
    const { Items } = records
    if(!Items){
      return []
    }

    for(let i=0; i<Items.length; i++){
      Items[i] = unmarshall(Items[i])
    }
    return Items
  } catch (error) {
    console.log(error)
    throw new DatabaseError()
  }
}
