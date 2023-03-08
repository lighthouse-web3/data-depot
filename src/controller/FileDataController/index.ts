import getUserUploads from '../../databaseOperations/getUserUploads'
import searchFileById from '../../databaseOperations/searchFileById'
import { Response, Request } from 'express'

export const get_user_uploads = async (req: any, res: Response) => {
  try {
    const fileList = await getUserUploads(req.user.userName, parseInt(req?.query?.pageNo as string))
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
