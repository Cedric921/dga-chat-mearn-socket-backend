import asyncHandler from 'express-async-handler';
import { NextFunction, Request, Response } from 'express';
// import User from '../models/user.model';
import Message from '../models/message.model';
import socket from '../socket';

export const getMessages = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const receiverId = req.params.id;
		const senderId = req.user?.id;

		if (!senderId || !receiverId) {
			const error = new Error('some data, fields missings');
			res.status(400);
			return next(error);
		} else {
			try {
				const messages = await Message.find({
					users: {
						$all: [senderId, receiverId],
					},
				});
				res.status(200).json(messages);
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
		const receiverId = req.params.id;
		const { content } = req.body;
		const senderId = req.user?.id;
		if (!senderId || !receiverId) {
			const error = new Error('some data, fields missings');
			res.status(400);
			return next(error);
		} else {
			try {
				const message = await Message.create({
					content,
					users: [senderId, receiverId],
					sender: senderId,
				});
				socket.getIO().emit('messages', { action: 'create', message: message });
				res.status(201).json(message);
			} catch (err) {
				const error = new Error('internal error');
				res.status(500);
				return next(error);
			}
		}
	}
);
