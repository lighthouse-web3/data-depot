import CustomError from './custom-error'

export default class ForbiddenError extends CustomError {
    constructor(message: string = 'Forbidden') {
        super('Forbidden', 403, message)
    }
}
