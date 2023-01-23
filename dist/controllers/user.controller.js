"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.updateImage = exports.loginUser = exports.registerUser = exports.getOneUser = exports.getAllUsers = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../models/user.model"));
const functions_1 = require("../utils/functions");
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const validation_1 = require("../utils/validation");
exports.getAllUsers = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.default.find();
        res.status(200).json({ users });
    }
    catch (error) {
        const err = new Error('internal error');
        res.status(500);
        return next(err);
    }
}));
exports.getOneUser = (0, express_async_handler_1.default)(
// eslint-disable-next-line @typescript-eslint/no-unused-vars
(req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const user = yield user_model_1.default.findById(id);
        if (user)
            res.status(200).json({ user });
        else {
            const err = new Error('user dont exist');
            res.status(400);
            return next(err);
        }
    }
    catch (error) {
        const err = new Error('internal error');
        res.status(500);
        return next(err);
    }
}));
exports.registerUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const validation = (0, validation_1.validateRegister)(req.body);
    if (validation.error) {
        const err = new Error('invalid user data provided');
        res.status(400);
        return next(err);
    }
    const { name, lastname, email, username, password } = req.body;
    // check if user exist
    const existUser = yield user_model_1.default.findOne({ email });
    if (existUser) {
        const err = new Error('user already exist');
        res.status(409);
        return next(err);
    }
    // hash password
    const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
    const user = yield user_model_1.default.create({
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
            token: (0, functions_1.generateToken)(user._id),
        });
    }
    else {
        const err = new Error('internal error');
        res.status(500);
        return next(err);
    }
}));
exports.loginUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validation = (0, validation_1.validateLoginData)(req.body);
        if (validation.error) {
            const err = new Error('Email or password is incorrect');
            res.status(400);
            return next(err);
        }
        const { username, email, password } = req.body;
        if (!password || (!username && !email)) {
            const error = new Error('some fields missing');
            res.status(409);
            return next(error);
        }
        let user;
        if (username) {
            user = yield user_model_1.default.findOne({ username });
        }
        else if (email) {
            user = yield user_model_1.default.findOne({ email });
        }
        if (user) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const isPasswordValid = bcryptjs_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                const error = new Error('Auth error');
                res.status(400);
                return next(error);
            }
            else {
                res.status(201).json({
                    _id: user._id,
                    name: user.name,
                    lastname: user.lastname,
                    email: user.email,
                    username: user.username,
                    imageUrl: user.imageUrl,
                    token: (0, functions_1.generateToken)(user._id),
                });
            }
        }
        else {
            const error = new Error('user not found');
            res.status(400);
            return next(error);
        }
    }
    catch (err) {
        const error = new Error('internal error');
        res.status(500);
        return next(error);
    }
}));
exports.updateImage = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!req.file) {
            const error = new Error('No image provided');
            res.status(400);
            return next(error);
        }
        const resCloud = yield cloudinary_1.default.uploader.upload(req.file.path, {
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const user = yield user_model_1.default.findById(userId);
        if (user) {
            user.imageUrl = resCloud.secure_url;
            user.cloudinary_id = resCloud.public_id;
            yield user.save();
            res.status(201).json({
                _id: user._id,
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                username: user.username,
                imageUrl: user.imageUrl,
                token: (0, functions_1.generateToken)(user._id),
            });
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        const error = new Error(err);
        res.status(500);
        return next(error);
    }
}));
exports.updateUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, lastname, email, username, password, password2, currentpassword, } = req.body;
    if (!id) {
        const error = new Error('user invalid');
        res.status(400);
        return next(error);
    }
    const user = yield user_model_1.default.findById(id);
    if (user) {
        const passwordMatched = yield bcryptjs_1.default.compare(currentpassword, 
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        user.password);
        if (!passwordMatched) {
            const error = new Error('invalid current password');
            res.status(400);
            return next(error);
        }
        if (password && password2 && password !== password2) {
            const error = new Error('new password validation error');
            res.status(400);
            return next(error);
        }
        const hashedNewPassword = password === password2
            ? yield bcryptjs_1.default.hash(password, yield bcryptjs_1.default.genSalt(10))
            : user.password;
        const updatedUser = yield user_model_1.default.updateOne(user._id, {
            name: name || user.name,
            lastname: lastname || user.lastname,
            email: email || user.email,
            username: username || user.username,
            password: hashedNewPassword,
        });
        res.status(201).json(updatedUser);
    }
    else {
        const error = new Error(`User wthi id ${id} not found`);
        res.status(400);
        return next(error);
    }
}));
