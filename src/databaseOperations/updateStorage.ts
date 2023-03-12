import dbbClient from './ddbClient'
import { storageUpdate } from './types'
import { DatabaseError } from '../errors'
import { userRecordTable } from '../utils/constants'

export default async (updatedDetails: storageUpdate) => {
    try {
        const params = {
            TableName: userRecordTable,
            Key: {
              userName: updatedDetails.userName
            },
            UpdateExpression: 'set dataUploaded = dataUploaded - :d, filesUploaded = filesUploaded - :f, lastUpdate = :l',
            ExpressionAttributeValues: {
                ':d': updatedDetails.dataCleared,
                ':f': 1,
                ':l': Date.now()
            },
        }

        await dbbClient.update(params)
        return 'Put Successful'
    } catch (error: any) {
        console.log(error)
        throw new DatabaseError({})
    }
}
