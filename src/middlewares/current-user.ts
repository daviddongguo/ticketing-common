import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
	id: string;
	email: string;
}

declare global {
	namespace Express {
		interface Request {
			currentUser?: UserPayload | null;
		}
	}
}

export const currentUser = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
  const token = req.session?.jwt;
  if(!token){
    console.log('token is not provided!');
    req.currentUser = null;
    return next();
  }

	let payload: UserPayload | null = null;
	try {
		payload = jwt.verify(req.session?.jwt, process.env.JWT_KEY!) as UserPayload;
	} catch (error) {
    console.log('token is INVALID!');
  }
	req.currentUser = payload;
	return next();
};
