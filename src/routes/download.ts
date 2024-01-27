import express from 'express'
import validate from '../middleware/validate'
import validator from '../middleware/validators'
import { download_car, download_car_head } from '../controller/DownloadController'

const router = express.Router()

router.head(
  '/download_car',
  validate(validator.fileIdSchema, { query: true }),
  download_car_head
)

router.get(
  '/download_car',
  validate(validator.fileIdSchema, { query: true }),
  download_car
)

export default router
