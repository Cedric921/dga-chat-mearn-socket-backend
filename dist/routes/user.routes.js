"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const auth_1 = require("../middlewares/auth");
const multer_1 = __importDefault(require("../config/multer"));
const router = express_1.default.Router();
router.get('/', auth_1.isAuth, user_controller_1.getAllUsers);
router.get('/:id', auth_1.isAuth, user_controller_1.getOneUser);
router.put('/:id', auth_1.isAuth, user_controller_1.updateUser);
router.post('/login', user_controller_1.loginUser);
router.post('/signup', user_controller_1.registerUser);
router.post('/image', auth_1.isAuth, multer_1.default.single('image'), user_controller_1.updateImage);
exports.default = router;
