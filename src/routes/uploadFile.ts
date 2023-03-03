import express from 'express'
import { uploadMultipleFile } from '../middleware/upload'
import FileUploadController from '../controller/FileUploadController'
const router = express.Router()

router.post(
  '/upload_files',
  uploadMultipleFile,
  FileUploadController.upload_multiple_files
)

export default router
