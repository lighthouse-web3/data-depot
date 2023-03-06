import express from 'express'
import validate from '../middleware/validate'
import validator from '../middleware/validators'
import {
  get_file_list,
  search_file_by_id,
} from '../controller/FileDataController'

const router = express.Router()

router.get(
  '/get_file_list',
  validate(validator.pageNumberSchema, { query: true }),
  get_file_list
)

router.get(
  '/search_file_by_id',
  validate(validator.fileIdSchema, { query: true }),
  search_file_by_id
)

export default router
