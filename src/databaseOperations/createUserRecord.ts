import dbbClient from './ddbClient'
import { userRecordTable } from '../utils/constants'
import { userRecord } from './types'
import { DatabaseError } from '../errors'

export default async (updatedDetails: userRecord) => {
    try {
        const params = {
            TableName: userRecordTable,
            Key: {
              userName: updatedDetails.userName
            },
            ConditionExpression: 'attribute_not_exists(userName)',
            UpdateExpression: 'set dataUploaded = :d, filesUploaded = :f, createdAt = :c, lastUpdate = :l',
            ExpressionAttributeValues: {
                ':d': updatedDetails.dataUploaded,
                ':f': updatedDetails.filesUploaded,
                ':c': updatedDetails.createdAt,
                ':l': updatedDetails.lastUpdate
            },
        }

        await dbbClient.update(params)
        return 'Put Successful'
    } catch (error: any) {
        if(error['$metadata']['httpStatusCode']===400){
          return 'User already exist'
        }
        throw new DatabaseError({})
    }
}
