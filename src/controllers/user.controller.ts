import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import User from '../models/user.model';
import { generateToken } from '../utils/functions';

export const getAllUsers = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const users = await User.find();
			res.status(200).json({ users });
		} catch (error) {
			const err = new Error('internal error');
			res.status(500);
			return next(err);
		}
	}
);

export const getOneUser = asyncHandler(
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id;
		try {
			const user = await User.findById(id);
			if (user) res.status(200).json({ user });
			else {
				const err = new Error('user dont exist');
				res.status(400);
				return next(err);
			}
		} catch (error) {
			const err = new Error('internal error');
			res.status(500);
			return next(err);
		}
	}
);

export const registerUser = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { name, lastname, email, username, password } = req.body;

		// check if user exist
		const existUser = await User.findOne({ email });
		if (existUser) {
			console.log(existUser);
			const err = new Error('user already exist');
			res.status(500);
			return next(err);
		}

		// hash password
		const hashedPassword = await bcrypt.hash(password, 12);

		const user = await User.create({
			name,
			lastname,
			email,
			password: hashedPassword,
			username,
		});
		if (user) {
			res.status(201).json({
				_id: user._id,
				name: user.name,
				lastname: user.lastname,
				email: user.email,
				username:user.username,
				token: generateToken(user._id),
			});
		} else {
			const err = new Error('internal error');
			res.status(500);
			return next(err);
		}
	}
);
