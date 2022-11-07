import asyncHandler from 'express-async-handler';
import { NextFunction, Request, Response } from 'express';
// import User from '../models/user.model';
import Message from '../models/message.model';

export const getMessages = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { receiver } = req.body;
		const senderId = req.user?.id;

		if (!senderId || !receiver) {
			const error = new Error('some data, fields missings');
			res.status(400);
			return next(error);
		} else {
			try {
				const messages = await Message.find({
					users: {
						$all: [senderId, receiver],
					},
				});
				res.status(200).json({ messages, sender: senderId, receiver });
			} catch (err) {
				const error = new Error('some data, fields missings');
				res.status(400);
				return next(error);
			}
		}
	}
);

export const addMessage = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { receiver, content } = req.body;
		const senderId = req.user?.id;
		if (!senderId || !receiver) {
			const error = new Error('some data, fields missings');
			res.status(400);
			return next(error);
		} else {
			try {
				const message = await Message.create({
					content,
					users: [senderId, receiver],
					sender: senderId,
				});
				res.status(201).json({ message });
			} catch (err) {
				const error = new Error('internal error');
				res.status(500);
				return next(error);
			}
		}
	}
);
