import express from 'express'
import { uploadMultipleFile } from '../middleware/upload'
import { upload_files } from '../controller/FileUploadController'
const router = express.Router()

router.post(
  '/upload_files',
  uploadMultipleFile,
  upload_files
)

export default router
