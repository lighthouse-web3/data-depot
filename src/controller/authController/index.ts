import { Request, Response, NextFunction } from 'express'
import { CustomError } from '../../errors'
import { getGithubOathToken, getGithubUser, newToken } from './service'
import createUserRecord from '../../databaseOperations/createUserRecord'

export const githubOauthHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const code = req.query.code as string
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

    res.status(200).send({
      access_token: token
    })
  } catch (err: any) {
    next(err)
  }
}
