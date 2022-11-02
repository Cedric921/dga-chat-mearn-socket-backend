import { registerUser } from './../controllers/user.controller';
import express from 'express';
import { getAllUsers, getOneUser } from '../controllers/user.controller';

const router = express.Router();

router.get('/:id', getOneUser);
router.get('/', getAllUsers);
router.post('/login');
router.post('/signup', registerUser);

export default router;
