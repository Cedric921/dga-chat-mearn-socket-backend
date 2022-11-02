import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// db config import
import connectDB from './config/db';

const app: Application = express();

// routes and middlewares import
import usersRoutes from './routes/user.routes';
import messagesRoutes from './routes/message.routes';
import errors from './middlewares/error.middleware';

dotenv.config();
connectDB();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req: Request, res: Response) =>
	res.json({ message: 'hello world' })
);

//use routes
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/messages', messagesRoutes);

// errors middlewares
app.use(errors.internalError);
app.use(errors.notFoundError);

const PORT: number | string | undefined = process.env.NODE_PORT || 1981;

app.listen(PORT, () => console.log(`app listening on ${PORT}`));
