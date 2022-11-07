import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

type JwtPayload = {
	id: string;
};

export const isAuth = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		let token;
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith('Bearer')
		) {
			try {
				// get token from request headers
				token = req.headers.authorization.split(' ')[1];

				//verify
				const decoded = jwt.verify(
					token,
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					process.env.JWT_SECRET!
				) as JwtPayload;

				// Get user from the token
				req.user = await User.findById(decoded.id);
				next();
			} catch (error) {
				const err = new Error('Not authorized');
				res.json(500);
				return next(err);
			}
		} else {
			const err = new Error('no token provided ');
			res.status(400);
			return next(err);
		}
	}
);
