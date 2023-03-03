import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import config from '../config'

const client = new DynamoDBClient({
  region: config.aws_region,
  credentials: {
    accessKeyId: config.aws_access_key_id ?? '',
    secretAccessKey: config.aws_secret_access_key ?? '',
  },
})

export default DynamoDBDocument.from(client)
// export default client
