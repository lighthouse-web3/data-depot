const CustomError = require('./custom-error')

module.exports = class AuthenticationError extends CustomError {
  constructor() {
    super('Unauthorized')
    this.statusCode = 401
    Object.setPrototypeOf(this, AuthenticationError.prototype)
  }

  static serializeErrors() {
    return [{ message: 'Unauthorized' }]
  }
}
