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
	password2: string;
	lastname: string;
	name: string;
}) => {
	const registerSchema = Joi.object({
		email: Joi.string().email().required(),
		username: Joi.string().min(2).required(),
		password: Joi.string().min(6).max(32).required(),
		password2: Joi.ref('password'),
		lastname: Joi.string(),
		name: Joi.string(),
	});
	return registerSchema.validate(userData);
};
