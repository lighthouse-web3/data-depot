import express from 'express'
import validate from '../middleware/validate'
import validator from '../middleware/validators'
import { download_car } from '../controller/DownloadController'

const router = express.Router()

router.get(
  '/download_car',
  validate(validator.fileIdSchema, { query: true }),
  download_car
)

export default router
