import Joi from 'joi';

export const validateLoginData = (login: {
	username: string;
	password: string;
}) => {
	const loginSchema = Joi.object({
		// email: Joi.string().email(),
		username: Joi.string().required(),
		password: Joi.string().min(6).max(32).required(),
	});
	return loginSchema.validate(login);
};

export const validateRegister = (userData: {
	email: string;
	username: string;
	password: string;
	lastname: string;
	firstname: string;
}) => {
	const registerSchema = Joi.object({
		email: Joi.string().email().required(),
		username: Joi.string().min(2).required(),
		password: Joi.string().min(6).max(32).required(),
		lastname: Joi.string(),
		firstname: Joi.string(),
	});
	return registerSchema.validate(userData);
};