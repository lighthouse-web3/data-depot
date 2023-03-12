import dbbClient from './ddbClient'
import { userRecordTable } from '../utils/constants'
import { userDataUpdate } from './types'
import { DatabaseError } from '../errors'

export default async (updatedDetails: userDataUpdate) => {
    try {
        const params = {
            TableName: userRecordTable,
            Key: {
              userName: updatedDetails.userName
            },
            UpdateExpression: 'set dataUploaded = dataUploaded + :d, filesUploaded = filesUploaded + :f, lastUpdate = :l',
            ExpressionAttributeValues: {
                ':d': updatedDetails.dataUploaded,
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
