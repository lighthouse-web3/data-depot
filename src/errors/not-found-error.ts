import CustomError from './custom-error'

export default class NotFoundError extends CustomError {
    constructor(message: string = 'Route not found') {
        super('Route not found', 404, message)
    }
}
