import express from 'express';
import {
	getAllUsers,
	getOneUser,
	loginUser,
	registerUser,
	updateImage,
	updateUser,
} from '../controllers/user.controller';
import { isAuth } from '../middlewares/auth';
import upload from '../config/multer';

const router = express.Router();

router.get('/', isAuth, getAllUsers);
router.get('/:id', isAuth, getOneUser);
router.put('/:id', isAuth, updateUser);
router.post('/login', loginUser);
router.post('/signup', registerUser);
router.post('/image', isAuth, upload.single('image'), updateImage);

export default router;
