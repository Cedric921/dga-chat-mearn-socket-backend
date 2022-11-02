import { Request, Response, NextFunction } from 'express';
//  User model import
import User from '../models/user.model';

export const getAllUsers = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const users = await User.find();
		res.status(200).json({ users });
	} catch (error) {
		res.status(500);
		return next(error);
	}
};
