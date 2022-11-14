"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const message_controller_1 = require("../controllers/message.controller");
const router = express_1.default.Router();
router.get('/:id', auth_1.isAuth, message_controller_1.getMessages);
router.post('/:id', auth_1.isAuth, message_controller_1.addMessage);
exports.default = router;
