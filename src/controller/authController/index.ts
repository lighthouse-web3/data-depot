import { Request, Response, NextFunction } from 'express'
import { CustomError } from '../../errors'
import config from '../../config'
import { getGithubOathToken, getGithubUser, newToken } from './service'

export const githubOauthHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the code from the query
    const code = req.query.code as string
    const pathUrl = (req.query.state as string) ?? '/'

    if (req.query.error) {
      return res.redirect(`${config.origin}/login`)
    }

    if (!code) {
      return next(
        new CustomError(
          'Authorization code not provided!',
          401,
          'Authorization code not provided!'
        )
      )
    }

    // Get the user the access_token with the code
    const { access_token } = await getGithubOathToken({ code })

    // Get the user with the access_token
    const usersData = await getGithubUser({ access_token })

    // Create access and refresh tokens
    const token = newToken(usersData)

    res.cookie('access_token', token, {
      secure: true,
      httpOnly: false,
      sameSite: 'lax',
    })
    res.cookie('logged_in', true, {
      secure: true,
      sameSite: 'lax',
      httpOnly: false,
    })
    res.redirect(`${config.origin}${pathUrl}`)
  } catch (err: any) {
    return res.redirect(`${config.origin}/oauth/error`)
  }
}
