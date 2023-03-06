import CustomError from './custom-error'

export default class BadRequestError extends CustomError {
    constructor(message: string = 'Bad Request') {
        super('Bad Request', 400, message)
    }
}
