class CustomError extends Error {
  constructor(name, statusCode, errors) {
    super(`${name}`)
    Object.setPrototypeOf(this, new.target.prototype)

    this.name = name
    this.statusCode = statusCode
    this.errors = errors

    Error.captureStackTrace(this, this.constructor)
  }

  serializeErrors() {
    return [{ message: this.errors }]
  }
}

module.exports = CustomError
