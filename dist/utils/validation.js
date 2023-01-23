"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = exports.validateLoginData = void 0;
const joi_1 = __importDefault(require("joi"));
const validateLoginData = (login) => {
    const loginSchema = joi_1.default.object({
        // email: Joi.string().email(),
        username: joi_1.default.string().required(),
        password: joi_1.default.string().min(6).max(32).required(),
    });
    return loginSchema.validate(login);
};
exports.validateLoginData = validateLoginData;
const validateRegister = (userData) => {
    const registerSchema = joi_1.default.object({
        email: joi_1.default.string().email().required(),
        username: joi_1.default.string().min(2).required(),
        password: joi_1.default.string().min(6).max(32).required(),
        password2: joi_1.default.ref('password'),
        lastname: joi_1.default.string(),
        name: joi_1.default.string(),
    });
    return registerSchema.validate(userData);
};
exports.validateRegister = validateRegister;
