import chaiHttp from 'chai-http';
import { describe } from 'mocha';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
// import app from '../src';

chai.use(chaiAsPromised);
chai.use(chaiHttp);

const expect = chai.expect;

describe('USERS tests', () => {
	describe('POST /api/v1/users/login', () => {
		it('should register user', () => {
			// chai.request(app).get('/api/v1/users/login').should.have.statusCode(400);
		});
	});

	it('should login a valid user', () => {
		// chai.request(app).get('/api/v1/users/login').should.have.statusCode(400);
	});

	it('should return a list of users', () => {
		// chai.request(app).get('/api/v1/users/login').should.have.statusCode(400);
	});
});

describe('MESSAGES tests', () => {
	describe('/api/v1/messages', () => {
		it('should return list of messages for user', () => {
			expect(12).to.be.a('number');
		});

		it('should add a new message', () => {
			// chai.request(app).get('/api/v1/users/login').should.have.statusCode(400);
		});
	});
});
