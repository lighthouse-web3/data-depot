import express from 'express'
import { githubOauthHandler } from '../controller/authController'

const router = express.Router()

router.get('/oauth/github', githubOauthHandler)

export default router
