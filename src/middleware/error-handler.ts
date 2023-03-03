import { NextFunction, Request, Response } from 'express'
import { CustomError } from '../errors'

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() })
  }
  res.status(400).send({
    errors: [{ message: 'Something went wrong' }],
  })
}
