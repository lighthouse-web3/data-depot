import express from 'express'
import { uploadMultipleFile } from '../middleware/upload'
import { upload_files } from '../controller/FileUploadController'
import { authenticate } from '../middleware/authenticate'
const router = express.Router()

router.post(
  '/upload_files',
  authenticate,
  uploadMultipleFile,
  upload_files
)

export default router
