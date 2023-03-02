const CustomError = require('./custom-error')

module.exports = class NotFoundError extends CustomError {
  constructor() {
    super('Route not found')
    this.statusCode = 404
    Object.setPrototypeOf(this, NotFoundError.prototype)
  }

  static serializeErrors() {
    return [{ message: 'Not Found' }]
  }
}
