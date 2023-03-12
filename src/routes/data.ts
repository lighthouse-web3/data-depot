import express from 'express'
import validate from '../middleware/validate'
import validator from '../middleware/validators'
import {
  get_user_uploads,
  search_file_by_id,
  user_details
} from '../controller/DataController'
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

router.get(
  '/user_details',
  authenticate,
  user_details
)

export default router
