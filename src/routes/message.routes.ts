import express from 'express';
import { isAuth } from '../middlewares/auth';
import { getMessages, addMessage } from '../controllers/message.controller';

const router = express.Router();

router.post('/getMessages', isAuth, getMessages);
router.post('/addMessages', isAuth, addMessage);

export default router;
