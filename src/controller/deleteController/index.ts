import chalk from 'chalk'
import type { NextFunction, Response } from 'express'
import { ForbiddenError } from '../../errors'
import searchFileById from '../../databaseOperations/searchFileById'
import updateStorage from '../../databaseOperations/updateStorage'
import updateFileStatus from '../../databaseOperations/updateFileStatus'
import config from '../../config'
import fs from 'fs'
import path from 'path'

export const delete_file = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get file record
    const fileInfo: any = await searchFileById(req.query.fileId)
    // verify file
    if (fileInfo.userName !== req.user.userName) {
      throw new ForbiddenError()
    }

    // Remove file
    const filePath = path.join(config.carPath, `${req.query.fileId}.car`)
    await fs.rmSync(filePath, { recursive: true })

    // update user data
    const upStorage = await updateStorage({
      userName: req.user.userName,
      dataCleared: fileInfo.fileSize,
    })

    // update file status
    const statusUpdate = await updateFileStatus({
      id: req.query.fileId,
      fileStatus: 'Deleted',
    })
    res.status(200).send('File deleted successfully')
  } catch (error: any) {
    console.log(chalk.red(`Error: Failed to delete- ${error}`))
    next(error)
  }
}
