import CustomError from './custom-error'

export default class RequestValidationError extends CustomError {
    constructor(errors: any) {
        super(
            'Invalid request parameters',
            400,
            errors.map((err:any) => {
                return { message: err.msg, field: err.param }
            })
        )
        this.errors = errors
        this.statusCode = 400
    }
}
