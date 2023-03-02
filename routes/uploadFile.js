const express = require('express')
const upload = require('../middleware/upload')
const FileUploadController = require('../controller/FileUploadController')
const router = express.Router()

router.post(
  '/upload_files',
  upload.uploadMultipleFile,
  FileUploadController.upload_multiple_files
)

module.exports = router
