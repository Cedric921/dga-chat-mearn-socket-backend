import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import morgan from 'morgan';
import path from 'path';
import socket from './socket';

// db config import
import connectDB from './config/db';

const app: Application = express();

// routes and middlewares import
import usersRoutes from './routes/user.routes';
import messagesRoutes from './routes/message.routes';
import errors from './middlewares/error.middleware';

// config
dotenv.config();
connectDB();

// const fileStorage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, path.join(__dirname, 'images'));
// 	},
// 	filename: (req, file, cb) => {
// 		cb(
// 			null,
// 			new Date().toISOString().replace(/:/g, '-') +
// 				'-' +
// 				file.originalname.replace(/ /g, '-')
// 		);
// 	},
// });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const fileFilter = (req: any, file: any, cb: any) => {
// 	if (
// 		file.mimetype === 'image/png' ||
// 		file.mimetype === 'image/jpg' ||
// 		file.mimetype === 'image/jpeg'
// 	) {
// 		cb(null, true);
// 	} else {
// 		cb(null, false);
// 	}
// };

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(multer({ fileFilter, storage: fileStorage }).single('image'));
app.use(morgan('dev'));
app.use('/images', express.static(path.join(__dirname, 'images')));

//use routes
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/messages', messagesRoutes);

// errors middlewares
app.use(errors.internalError);
app.use(errors.notFoundError);

const PORT: number | string | undefined = process.env.NODE_PORT || 1981;

const httpServer = createServer(app).listen(PORT, () =>
	// eslint-disable-next-line no-console
	console.log(`app listening on ${PORT}`)
);

const io = socket.init(httpServer);

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
io.on('connection', (socket: any) => {
	// eslint-disable-next-line no-console
	console.log('socket connected to client');
	socket.emit('message', 'hello world');
});
