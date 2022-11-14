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
				username: user.username,
				imageUrl: user.imageUrl,
				token: generateToken(user._id),
			});
		} else {
			const err = new Error('internal error');
			res.status(500);
			return next(err);
		}
	}
);

export const loginUser = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { username, email, password } = req.body;

			if (!password || (!username && !email)) {
				const error = new Error('some fields missing');
				res.status(409);
				return next(error);
			}

			let user;

			if (username) {
				user = await User.findOne({ username });
			} else if (email) {
				user = await User.findOne({ email });
			}

			if (user) {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				const isPasswordValid = bcrypt.compare(password, user.password!);
				if (!isPasswordValid) {
					const error = new Error('Auth error');
					res.status(400);
					return next(error);
				} else {
					res.status(201).json({
						_id: user._id,
						name: user.name,
						lastname: user.lastname,
						email: user.email,
						username: user.username,
						imageUrl: user.imageUrl,
						token: generateToken(user._id),
					});
				}
			} else {
				const error = new Error('user not found');
				res.status(400);
				return next(error);
			}
		} catch (err) {
			const error = new Error('internal error');
			res.status(500);
			return next(error);
		}
	}
);

export const updateImage = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			if (!req.file) {
				const error = new Error('No image provided');
				res.status(400);
				return next(error);
			}
			const userId = req.user?.id;
			const imageUrl = '/images/' + req.file.filename;
			const user = await User.findById(userId);
			if (user) {
				user.imageUrl = imageUrl;
				await user.save();

				res.status(201).json({
					_id: user._id,
					name: user.name,
					lastname: user.lastname,
					email: user.email,
					username: user.username,
					imageUrl: user.imageUrl,
					token: generateToken(user._id),
				});
			}
		} catch (err) {
			const error = new Error('internal error');
			res.status(500);
			return next(error);
		}
	}
);

export const updateUser = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		const { name, lastname, email, username } = req.body;
		if (!id) {
			const error = new Error('user invalid');
			res.status(400);
			return next(error);
		}
		const user = await User.findByIdAndUpdate(id, {
			name,
			lastname,
			email,
			username,
		});
		if (!user) {
			const error = new Error('User wthi id ${id} not found');
			res.status(400);
			return next(error);
		}
		res.status(201).json(user);
	}
);
