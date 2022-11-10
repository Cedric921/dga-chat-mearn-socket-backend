"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.get('/', user_controller_1.getAllUsers);
router.get('/:id', user_controller_1.getOneUser);
router.post('/login', user_controller_1.loginUser);
router.post('/signup', user_controller_1.registerUser);
router.post('/image', auth_1.isAuth, user_controller_1.updateImage);
exports.default = router;
