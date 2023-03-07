import { verifyToken } from '../controller/authController/service'
import type { Request, Response, NextFunction } from 'express'

export const protect = async (req: any, res: Response, next: NextFunction) => {
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith(`Bearer `)
    ) {
      return res.status(401).end()
    }
    const data = await verifyToken(
      req.headers.authorization.split(`Bearer `)[1]
    )
    if (!data) {
      req.user = data
      next()
    }
  } catch (err: any) {
    console.log(err.message)
    return res.status(401).end()
  }
}

export const protectWithCookies = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.cookies['access_token']) {
      return res.status(401).end()
    }
    const data = await verifyToken(req.cookies['access_token'])
    if (!data) {
      req.user = data
      next()
    }
  } catch (err: any) {
    console.log(err.message)
    return res.status(401).end()
  }
}
