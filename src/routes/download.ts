import express from 'express'
import validate from '../middleware/validate'
import validator from '../middleware/validators'
import DownloadController from '../controller/DownloadController'

const router = express.Router()

router.get(
  '/download_car',
  validate(validator.pieceCIDSchema, { query: true }),
  DownloadController.download_car
)

export default router
