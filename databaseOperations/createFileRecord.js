const dbbClient = require('./ddbClient')
const { carRecordTable } = require('../utils/constants')
const { DatabaseError } = require('../errors')

module.exports = async (record) => {
  try {
    const params = {
      TableName: carRecordTable,
      Item: record,
    }

    await dbbClient.put(params).promise()
    return 'Put Successful'
  } catch (error) {
    console.log(error)
    throw new DatabaseError()
  }
}
