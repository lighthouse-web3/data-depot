import express from 'express'
import { githubOauthHandler, logoutHandler } from '../controller/authController'

const router = express.Router()

router.get('/oauth/github', githubOauthHandler)
router.get('/logout', logoutHandler)

export default router
