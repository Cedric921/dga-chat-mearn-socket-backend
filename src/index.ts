import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';

const app: Application = express();

// routes import
import usersRoutes from './routes/user.routes';
import messagesRoutes from './routes/message.routes';

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req: Request, res: Response) =>
	res.json({ message: 'hello world' })
);

//use routes
app.use(usersRoutes);
app.use(messagesRoutes);

const PORT: number | string | undefined = process.env.NODE_PORT || 1981;

app.listen(PORT, () => console.log(`app listening on ${PORT}`));
