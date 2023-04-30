import { NextFunction, Request, Response } from 'express'
import { CustomError } from '../errors'
import { eventEmitter } from '../errors/eventEmitter'

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() })
  }
  eventEmitter.emit('unKnownError', err)
  res.status(400).send({
    errors: [{ message: 'Something went wrong' }],
  })
}
