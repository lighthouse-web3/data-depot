import CustomError from './custom-error'

export default class DatabaseError extends CustomError {
    constructor(errors: any = {}) {
        super('DataBase error', 502, errors)
    }
}
