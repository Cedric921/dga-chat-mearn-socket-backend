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
exports.addMessage = exports.getMessages = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
// import User from '../models/user.model';
const message_model_1 = __importDefault(require("../models/message.model"));
exports.getMessages = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { sender, receiver } = req.body;
    if (!sender || !receiver) {
        const error = new Error('some data, fields missings');
        res.status(400);
        return next(error);
    }
    else {
        try {
            const messages = yield message_model_1.default.find({
                users: {
                    $all: [sender, receiver],
                },
            });
            res.status(200).json({ messages, sender, receiver });
        }
        catch (err) {
            const error = new Error('some data, fields missings');
            res.status(400);
            return next(error);
        }
    }
}));
exports.addMessage = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { sender, receiver, content } = req.body;
    if (!sender || !receiver) {
        const error = new Error('some data, fields missings');
        res.status(400);
        return next(error);
    }
    else {
        try {
            const message = new message_model_1.default({
                content,
                users: [sender, receiver],
                sender,
            });
            res.status(200).json({ message });
        }
        catch (err) {
            const error = new Error('internal error');
            res.status(500);
            return next(error);
        }
    }
}));
