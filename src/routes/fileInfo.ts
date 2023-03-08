import express from 'express'
import validate from '../middleware/validate'
import validator from '../middleware/validators'
import {
  get_user_uploads,
  search_file_by_id,
} from '../controller/FileDataController'
import { authenticate } from '../middleware/authenticate'

const router = express.Router()

router.get(
  '/get_user_uploads',
  validate(validator.pageNumberSchema, { query: true }),
  authenticate,
  get_user_uploads
)

router.get(
  '/search_file_by_id',
  validate(validator.fileIdSchema, { query: true }),
  search_file_by_id
)

export default router
