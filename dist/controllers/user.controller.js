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
exports.loginUser = exports.registerUser = exports.getOneUser = exports.getAllUsers = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../models/user.model"));
const functions_1 = require("../utils/functions");
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
    const { name, lastname, email, username, password } = req.body;
    // check if user exist
    const existUser = yield user_model_1.default.findOne({ email });
    if (existUser) {
        const err = new Error('user already exist');
        res.status(500);
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
