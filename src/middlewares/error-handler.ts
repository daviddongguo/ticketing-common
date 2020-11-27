import {NextFunction, Request, Response} from 'express';
import {CustomError} from '../errors/custom-error';

export const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof CustomError) {
		console.table(err.serializeErrors());
		res.status(err.statusCode).send({errors: err.serializeErrors()});
	} else {
		console.table(err.message);
		res
			.status(400)
			.send({errors: [{message: err.message || 'Something broke!'}]});
	}
};
