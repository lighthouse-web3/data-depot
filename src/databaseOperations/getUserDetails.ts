import chalk from 'chalk'
import dbbClient from './ddbClient'
import { userRecordTable } from '../utils/constants'

export default async (userName: string) => {
  try {
    const params = {
      TableName: userRecordTable,
      Key: {
        userName: userName
      },
    }

    const record = await dbbClient.get(params)
    return record.Item
  } catch (error: any) {
    console.log(
      chalk.yellow('User Detail Fetch Error: ') + chalk.red(error.message)
    )
    return null
  }
}
