const express = require('express')
const validate = require('../middleware/validate')
const validator = require('../middleware/validators')
const FileDataController = require('../controller/FileDataController')

const router = express.Router()

router.get(
  '/get_file_list',
  validate(validator.pageNumberSchema, { query: true }),
  FileDataController.get_file_list
)

router.get(
  '/search_file_by_id',
  validate(validator.fileIdSchema, { query: true }),
  FileDataController.search_file_by_id
)

module.exports = router
