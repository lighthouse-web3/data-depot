const dbbClient = require('./ddbClient')
const { carRecordTable } = require('../utils/constants')
const { DatabaseError } = require('../errors')

module.exports = async (pageNo) => {
  try {
    let records = null
    let count = 0
    let exclusiveStartKey = null
    if (pageNo < 1) {
      throw new DatabaseError()
    }
    do {
      const params = {
        TableName: carRecordTable,
        Limit: 2,
        ExclusiveStartKey: exclusiveStartKey,
      }

      records = await dbbClient.scan(params).promise()
      console.log(records)
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
    return Items
  } catch (error) {
    console.log(error)
    throw new DatabaseError()
  }
}
