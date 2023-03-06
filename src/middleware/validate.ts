import { Request, Response, NextFunction } from 'express'
import { RequestValidationError } from '../errors'

export default (schema: any, intercept: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const payload =
      intercept.query && intercept.body
        ? { ...req.query, ...req.body }
        : intercept.body
        ? { ...req.body }
        : { ...req.query }
    const validated = schema.validate(payload, { allowUnknown: false })
    if (validated.error) {
      const errors = validated.error.details.map((err: any) => {
        return {
          msg: err.message.replace(/"/g, ''),
          param: err.context.key,
        }
      })
      return next(new RequestValidationError(errors))
    }
    return next()
  }
}
