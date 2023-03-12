import express from 'express'
import validate from '../middleware/validate'
import validator from '../middleware/validators'
import {
  delete_file
} from '../controller/deleteController'
import { authenticate } from '../middleware/authenticate'

const router = express.Router()

router.delete(
  '/delete_file',
  validate(validator.fileIdSchema, { query: true }),
  authenticate,
  delete_file
)

export default router
