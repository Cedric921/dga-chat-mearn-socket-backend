import express from 'express';
import { isAuth } from '../middlewares/auth';
import { getMessages, addMessage } from '../controllers/message.controller';

const router = express.Router();

router.get('/:id', isAuth, getMessages);
router.post('/:id', isAuth, addMessage);

export default router;
