/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import app from '../src/index';
import request from 'supertest';
let token = '';
describe('AUTH TESTS', () => {
	describe('should return a 404 respoonse', () => {
		it('Hello API Request', async () => {
			const result = await request(app).get('/');
			expect(result.status).toEqual(404);
		});
	});

	describe('POST /api/v1/users/login', () => {
		it('should return a error', async () => {
			const res = await request(app).post('/api/v1/users/login').send({
				email: 'ckarungu921@gmail.com',
				password: '123456',
			});
			expect(res.body.message).toEqual('Email or password is incorrect');
			expect(res.status).toEqual(500);
		});

		it('should login a  user', async () => {
			const res = await request(app).post('/api/v1/users/login').send({
				username: 'vb',
				password: '123456',
			});
			// expect(res.body.message).toEqual('Email or password is incorrect');
			expect(res.status).toEqual(201);
			token = res.body.token;
		});

		it('should return user info', async () => {
			//
		});

		it('should return the users list', async () => {
			//
			const res = await await request(app)
				.get('/api/v1/users')
				.auth(token, { type: 'bearer' });

			expect(res.status).toEqual(200);
		});
	});
});

describe('MESSAGES TETS', () => {
	it('should return all messages for connected user', async () => {
		//
	});
});
