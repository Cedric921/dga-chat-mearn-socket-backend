"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const messageShema = new Schema({
    content: String,
    sender: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    users: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: 'User',
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model('Message', messageShema);
