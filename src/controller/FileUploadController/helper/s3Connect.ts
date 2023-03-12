import chalk from 'chalk'
import S3 from 'aws-sdk/clients/s3'
import config from '../../../config'

export const s3Connect = async () => {
  const log = console.log
  try {
    const s3 = new S3({
      accessKeyId: config.aws_access_key_id,
      secretAccessKey: config.aws_secret_access_key,
      region: config.aws_region
    })

    return s3
  } catch (error) {
    log(chalk.red('Failed to connect to S3: ') + error)
    return null
  }
}
