import { eventEmitter } from './eventEmitter'
class CustomError extends Error {
  statusCode: number
  errors?: any

  constructor(name: string, statusCode: number, errors: any) {
    super(`${name}`)
    this.name = name
    this.statusCode = statusCode
    this.errors = errors
    eventEmitter.emit('customError', { name, statusCode, errors })
    Error.captureStackTrace(this, this.constructor)
  }

  serializeErrors() {
    return [{ message: this.errors }]
  }
}

export default CustomError
