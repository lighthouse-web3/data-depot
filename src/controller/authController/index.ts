import { Request, Response, NextFunction } from 'express'
import SHA256 from 'crypto-js/sha256'
import { CustomError } from '../../errors'
import verifyApiKey from '../../databaseOperations/verifyApiKey'
import getUserDetails from '../../databaseOperations/getUserDetails'
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

export const lighthouseAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.headers.authorization?.split(`Bearer `)[1]
  const data = await verifyApiKey(SHA256(accessToken?accessToken:'').toString())

  // Check if user exist
  if(!data){
    res.status(403).send('Forbidden')
  } else{
    const userDetails = await getUserDetails(data.publicKey)
    if(!userDetails){
      // Create User
      const timeStamp = Date.now()
      const saveRecord = await createUserRecord({
        userName: data.publicKey,
        dataUploaded: 0,
        filesUploaded: 0,
        createdAt: timeStamp,
        lastUpdate: timeStamp,
      })
    }
    const token = newToken({
      avatarURL: '',
      userName: data.publicKey
    })
    res.status(200).send({
      access_token: token
    })
  }
}
