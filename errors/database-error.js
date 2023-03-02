const CustomError = require('./custom-error')

module.exports = class DatabaseError extends CustomError {
  constructor(name) {
    super(name)
    this.statusCode = 502
    Object.setPrototypeOf(this, DatabaseError.prototype)
  }

  static serializeErrors() {
    return [{ message: 'Something Went Wrong' }]
  }
}
