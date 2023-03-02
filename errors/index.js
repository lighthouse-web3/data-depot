/* eslint-disable global-require */
module.exports = {
  NotFoundError: require('./not-found-error'),
  RequestValidationError: require('./request-validation-error'),
  AuthenticationError: require('./authentication-error'),
  BadRequestError: require('./bad-request'),
  CustomError: require('./custom-error'),
  DatabaseError: require('./database-error'),
  ForbiddenError: require('./forbidden'),
}
