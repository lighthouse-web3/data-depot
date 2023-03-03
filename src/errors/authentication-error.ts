import CustomError from './custom-error'

export default class AuthenticationError extends CustomError {
    constructor(message: string = 'Unauthorized') {
        super('Unauthorized', 401, message)
    }
}
