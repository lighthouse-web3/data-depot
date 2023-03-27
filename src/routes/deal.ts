import express from 'express'
import { dealsDetails } from '../controller/dealController'
const router = express.Router()

router.route('/:dealId').get(dealsDetails).post(dealsDetails)

export default router
