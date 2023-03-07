import { Request, Response, NextFunction } from 'express'
import { CustomError } from '../../errors'
import config from '../../config'
import { getGithubOathToken, getGithubUser } from './service'

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
    const { email, avatar_url, login } = await getGithubUser({ access_token })

    // // Create new user or update user if user already exist
    // const user = await findAndUpdateUser(
    //   { email },
    //   {
    //     email,
    //     photo: avatar_url,
    //     name: login,
    //     provider: 'GitHub',
    //     verified: true,
    //   },
    //   { runValidators: false, new: true, upsert: true }
    // )

    // if (!user) {
    //   return res.redirect(`${config.origin}/oauth/error`)
    // }

    // // Create access and refresh tokens
    // const { access_token: accessToken, refresh_token } = await signToken(user)

    // res.cookie('access_token', accessToken)
    // res.cookie('refresh_token', refresh_token)
    // res.cookie('logged_in', true, {
    //   httpOnly: false,
    // })

    res.redirect(`${config.origin}${pathUrl}`)
  } catch (err: any) {
    return res.redirect(`${config.origin}/oauth/error`)
  }
}
