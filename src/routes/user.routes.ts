import express from 'express';
import {
	getAllUsers,
	getOneUser,
	loginUser,
	registerUser,
} from '../controllers/user.controller';
import { isAuth } from '../middlewares/auth';

const router = express.Router();

router.get('/', isAuth, getAllUsers);
router.get('/:id', isAuth, getOneUser);
router.post('/login', loginUser);
router.post('/signup', registerUser);

export default router;
