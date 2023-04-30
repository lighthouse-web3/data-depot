import express from 'express'
import { githubOauthHandler, lighthouseAuth } from '../controller/authController'

const router = express.Router()

router.get('/oauth/github', githubOauthHandler)
router.get('/lighthouse_auth', lighthouseAuth)

export default router
