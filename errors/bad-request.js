const CustomError = require('./custom-error')

module.exports = class BadRequestError extends CustomError {
  constructor() {
    super('Bad Request')
    this.statusCode = 400
    Object.setPrototypeOf(this, BadRequestError.prototype)
  }

  static serializeErrors() {
    return [{ message: 'Bad Request' }]
  }
}
