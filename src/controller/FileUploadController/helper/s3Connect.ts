import chalk from 'chalk'
import AWS from 'aws-sdk'
import config from '../../../config'
import { carFileBucket } from '../../../utils/constants'

export const s3Connect = async () => {
  const log = console.log
  try {
    AWS.config.update(
      {
        accessKeyId: config.aws_access_key_id,
        secretAccessKey: config.aws_secret_access_key,
        region: config.aws_region
      }
    );
    const s3 = new AWS.S3({params: {Bucket: carFileBucket}})

    return s3
  } catch (error) {
    log(chalk.red('Failed to connect to S3: ') + error)
    return null
  }
}
