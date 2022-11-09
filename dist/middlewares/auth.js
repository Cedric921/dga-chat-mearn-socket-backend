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
exports.isAuth = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
exports.isAuth = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        try {
            // get token from request headers
            token = req.headers.authorization.split(' ')[1];
            //verify
            const decoded = jsonwebtoken_1.default.verify(token, 
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            process.env.JWT_SECRET);
            // Get user from the token
            req.user = yield user_model_1.default.findById(decoded.id);
            next();
        }
        catch (error) {
            const err = new Error('Not authorized');
            res.json(400);
            return next(err);
        }
    }
    else {
        const err = new Error('no token provided ');
        res.status(400);
        return next(err);
    }
}));
