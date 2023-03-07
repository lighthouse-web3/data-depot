import dbbClient from './ddbClient'

export const findAndUpdateUser = async (
  email: string,
  userId: number,
  login: string
) => {
  // const params = {
  //   TableName: 'DataTop Users',
  //   Key: {
  //     email: email,
  //   },
  //   UpdateExpression: 'set userId = :userId, #n = :name, verified = :verified',
  //   ExpressionAttributeValues: {
  //     ':userId': userId,
  //     ':name': login,
  //     ':verified': true,
  //   },
  //   ExpressionAttributeNames: {
  //     '#n': 'name',
  //   },
  //   ReturnValues: 'ALL_NEW',
  //   ConditionExpression: 'attribute_exists(email)',
  // }

  // try {
  //   const result = await dbbClient.update(params)
  //   return result.Attributes
  // } catch (err: any) {
  //   if (err.code === 'ConditionalCheckFailedException') {
  //     // User record does not exist, so insert new record
  //     const params = {
  //       TableName: 'Users',
  //       Item: {
  //         email: email,
  //         userId: userId,
  //         name: login,
  //         verified: true,
  //       },
  //       ReturnValues: 'ALL_OLD',
  //     }
  //     const result = await dbbClient.put(params)
  //     return result.Attributes
  //   } else {
  //     throw err
  //   }
  // }

  return { email, userId, login }
}
