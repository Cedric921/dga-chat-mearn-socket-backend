import express from 'express';
import {
	getAllUsers,
	getOneUser,
	loginUser,
	registerUser,
} from '../controllers/user.controller';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getOneUser);
router.post('/login', loginUser);
router.post('/signup', registerUser);

export default router;
