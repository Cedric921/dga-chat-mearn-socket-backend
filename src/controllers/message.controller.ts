import asyncHandler from 'express-async-handler';
import { NextFunction, Request, Response } from 'express';
// import User from '../models/user.model';
import Message from '../models/message.model';

export const getMessages = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { sender, receiver } = req.body;

		if (!sender || !receiver) {
			const error = new Error('some data, fields missings');
			res.status(400);
			return next(error);
		} else {
			try {
				const messages = await Message.find({
					users: {
						$all: [sender, receiver],
					},
				});
				res.status(200).json({ messages, sender, receiver });
			} catch (err) {
				const error = new Error('some data, fields missings');
				res.status(400);
				return next(error);
			}
		}
	}
);
