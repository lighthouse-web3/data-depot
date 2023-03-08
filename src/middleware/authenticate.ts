import { verifyToken } from '../controller/authController/service'
import { ForbiddenError } from '../errors'
import type { Response, NextFunction } from 'express'

export const authenticate = async (req: any, res: Response, next: NextFunction) => {
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith(`Bearer `)
    ) {
      throw new ForbiddenError()
    }
    const data = await verifyToken(
      req.headers.authorization.split(`Bearer `)[1]
    )
    if (!data) {
      throw new ForbiddenError()
    }
    req.user = data
    next()
  } catch (err: any) {
    res.status(403).end()
  }
}
