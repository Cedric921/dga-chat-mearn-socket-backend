/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';

export const internalError = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const errorCode = req.statusCode ?? 500;
	res.status(errorCode).json({ message: err.message, stack: err.stack });
	// next()
};

export const notFoundError = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.status(404).json({ error: 'not found' });
};

const errors = { internalError, notFoundError };
export default errors;
