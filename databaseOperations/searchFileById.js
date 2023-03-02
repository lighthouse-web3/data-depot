const dbbClient = require('./ddbClient')
const { carRecordTable } = require('../utils/constants')
const { DatabaseError } = require('../errors')

module.exports = async (fileId) => {
  try {
    const params = {
      TableName: carRecordTable,
      Key: {
        id: fileId,
      },
    }

    const record = await dbbClient.get(params).promise()
    const { Item } = record
    return Item
  } catch (error) {
    console.log(error)
    throw new DatabaseError()
  }
}
