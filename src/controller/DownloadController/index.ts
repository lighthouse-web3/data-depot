import chalk from 'chalk'
import { carFileBucket } from '../../utils/constants'
import type { NextFunction, Response } from 'express'
import { s3Connect } from '../FileUploadController/helper/s3Connect'

export const download_car = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const s3 = await s3Connect()
    if (!s3) {
      throw new Error()
    }

    res.attachment(req.query.fileId)
    const options = {
      Bucket: carFileBucket,
      Key: req.query.fileId,
    }
    const fileStream = s3.getObject(options).createReadStream()
    fileStream.pipe(res)
  } catch (error: any) {
    console.log(chalk.red(`Error: Failed to download- ${req.query.fileId}`))
    next(error)
  }
}
