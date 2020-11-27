import {ValidationError} from 'express-validator';
import {CustomError} from './custom-error';

export class RequestValidationError extends CustomError {
	constructor(public errors: ValidationError[], message?: string) {
		super(message || 'Invalid Inputs');
		// Only because we are extending a built in class
		Object.setPrototypeOf(this, RequestValidationError.prototype);
	}

	statusCode = 400;
	serializeErrors() {
		return this.errors.map((error) => {
			return {message: error.msg, field: error.param};
		});
	}
}
