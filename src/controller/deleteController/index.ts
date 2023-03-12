import chalk from 'chalk'
import { carFileBucket } from '../../utils/constants'
import type { NextFunction, Response } from 'express'
import { ForbiddenError } from '../../errors'
import searchFileById from '../../databaseOperations/searchFileById'
import updateStorage from '../../databaseOperations/updateStorage'
import updateFileStatus from '../../databaseOperations/updateFileStatus'
import { s3Connect } from '../FileUploadController/helper/s3Connect'

export const delete_file = async (req: any, res: Response, next: NextFunction) => {
  try {
    // Get file record
    const fileInfo: any = await searchFileById(req.query.fileId)
    // verify file
    if(fileInfo.userName !== req.user.userName) {
      throw new ForbiddenError()
    }

    // Remove file
    const s3 = await s3Connect()
    if(!s3){
      throw new Error()
    }
    const params = {
      Bucket: carFileBucket,
      Key: req.query.fileId
    };
    const deleteObject = await s3.deleteObject(params as any).promise()

    // update user data
    const upStorage = await updateStorage({
      userName: req.user.userName,
      dataCleared: fileInfo.fileSize
    })

    // update file status
    const statusUpdate = await updateFileStatus({
      id: req.query.fileId,
      fileStatus: 'Deleted'
    })
    res.status(200).send("File deleted successfully")
  } catch (error: any) {
    console.log(chalk.red(`Error: Failed to download- ${req.query.piece_cid}`))
    next(error)
  }
}
