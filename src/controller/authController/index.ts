import { Request, Response, NextFunction } from 'express'
import { CustomError } from '../../errors'
import config from '../../config'
import { getGithubOathToken, getGithubUser, newToken } from './service'
import createUserRecord from '../../databaseOperations/createUserRecord'

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

    const { access_token } = await getGithubOathToken({ code })
    const {avatar_url, login} = await getGithubUser({ access_token })

    // Create access and refresh tokens
    const token = newToken({
      avatarURL: avatar_url,
      userName: login
    })

    const timeStamp = Date.now()
    const saveRecord = await createUserRecord({
      userName: login,
      dataUploaded: 0,
      filesUploaded: 0,
      createdAt: timeStamp,
      lastUpdate: timeStamp,
    })

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
    res.redirect(`${config.origin}/oauth/error`)
  }
}

export const logoutHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.cookie('access_token', '', { maxAge: 1 });
    res.cookie('logged_in', '', { maxAge: 1 });
    res.status(200).json({ status: 'success' });
  } catch (err: any) {
    next(err);
  }
};
