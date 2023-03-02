const CustomError = require('./custom-error')

module.exports = class RequestValidationError extends CustomError {
  constructor(errors) {
    super('Invalid request parameters')
    this.errors = errors
    this.statusCode = 400
    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype)
    Error.captureStackTrace(this, this.constructor)
  }

  static serializeErrors() {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.param }
    })
  }
}
