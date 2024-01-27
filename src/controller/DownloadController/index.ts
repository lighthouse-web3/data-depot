import chalk from 'chalk'
import { carFileBucket } from '../../utils/constants'
import type { NextFunction, Response } from 'express'
import { s3Connect } from '../FileUploadController/helper/s3Connect'

export const download_car_head = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(chalk.yellow(`Miner getting file metadata: ${req.query.fileId}`))
    const s3 = await s3Connect()
    if (!s3) {
      throw new Error()
    }

    const options = {
      Bucket: carFileBucket,
      Key: req.query.fileId,
    }

    s3.headObject(options, (err, data) => {
      if (err) {
        console.log(chalk.red(`Error: Failed to get metadata- ${req.query.fileId}`))
        next(err)
      } else {
	res.writeHead(200, {
          'Content-Length': data.ContentLength,
          'Last-Modified': data.LastModified?.toUTCString(),
          'Content-Type': data.ContentType,
        })
        res.end()
      }
    })
  } catch (error: any) {
    console.log(chalk.red(`Error: Failed to get metadata- ${req.query.fileId}`))
    next(error)
  }
}

export const download_car = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(chalk.yellow(`Miner downloading file: ${req.query.fileId}`))
    const s3 = await s3Connect()
    if (!s3) {
      throw new Error()
    }

//    res.attachment(req.query.fileId)
    res.setHeader('Content-Disposition', 'attachment; filename=' + req.query.fileId)

    const options = {
      Bucket: carFileBucket,
      Key: req.query.fileId,
    }
    const fileStream = s3.getObject(options).createReadStream()
//    fileStream.pipe(res)
    fileStream.on('data', (chunk) => {
      res.write(chunk)
    })
    fileStream.on('end', () => {
      res.end()
    })
  } catch (error: any) {
    console.log(chalk.red(`Error: Failed to download- ${req.query.fileId}`))
    next(error)
  }
}
