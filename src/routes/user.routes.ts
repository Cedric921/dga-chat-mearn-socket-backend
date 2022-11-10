import express from 'express';
import {
	getAllUsers,
	getOneUser,
	loginUser,
	registerUser,
	updateImage,
} from '../controllers/user.controller';
import { isAuth } from '../middlewares/auth';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getOneUser);
router.post('/login', loginUser);
router.post('/signup', registerUser);
router.post('/image', isAuth, updateImage);

export default router;
