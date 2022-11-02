import express from 'express';
import { getAllUsers } from '../controllers/user.controller';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id');
router.post('/login');
router.post('/signup');

export default router;
