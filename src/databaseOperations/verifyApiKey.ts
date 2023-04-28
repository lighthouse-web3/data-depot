import dbbClient from './ddbClient'
import { userAuthTable } from '../utils/constants'

export default async (apiKey: string) => {
  try {
    const params = {
      TableName: userAuthTable,
      IndexName: 'apiKey-index',
      KeyConditionExpression: 'apiKey = :a',
      ExpressionAttributeValues: {
        ':a': apiKey,
      },
    }

    const record = await dbbClient.query(params)
    const Items = record.Items ?? []
    return Items[0]
  } catch (error: any) {
    console.log('Check Api Key Error: ' + error.message)
    return null
  }
}
