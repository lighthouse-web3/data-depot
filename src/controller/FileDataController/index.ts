import getFileList from '../../databaseOperations/getFileList'
import searchFileById from '../../databaseOperations/searchFileById'
import { Response, Request } from 'express'

export const get_file_list = async (req: Request, res: Response) => {
  try {
    const fileList = await getFileList(parseInt(req?.query?.pageNo as string))
    res.status(200).send(fileList)
  } catch (err) {
    res.status(500)
  }
}

export const search_file_by_id = async (req: Request, res: Response) => {
  try {
    const fileInfo = await searchFileById(req.query.fileId)
    res.status(200).send(fileInfo)
  } catch (err) {
    res.status(500)
  }
}
