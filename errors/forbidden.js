const CustomError = require('./custom-error')

module.exports = class ForbiddenError extends CustomError {
  constructor() {
    super('Forbidden')
    this.statusCode = 403
    Object.setPrototypeOf(this, ForbiddenError.prototype)
  }

  static serializeErrors() {
    return [{ message: 'Forbidden' }]
  }
}
