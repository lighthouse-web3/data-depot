const express = require('express')
const validate = require('../middleware/validate')
const validator = require('../middleware/validators')
const DownloadController = require('../controller/DownloadController')

const router = express.Router()

router.get(
  '/download_car',
  validate(validator.pieceCIDSchema, { query: true }),
  DownloadController.download_car
)

module.exports = router
