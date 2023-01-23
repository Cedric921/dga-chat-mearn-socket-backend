"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const socket_1 = __importDefault(require("./socket"));
// db config import
const db_1 = __importDefault(require("./config/db"));
const app = (0, express_1.default)();
// routes and middlewares import
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const message_routes_1 = __importDefault(require("./routes/message.routes"));
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
// config
dotenv_1.default.config();
(0, db_1.default)();
// middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// app.use(multer({ fileFilter, storage: fileStorage }).single('image'));
app.use((0, morgan_1.default)('dev'));
app.use('/images', express_1.default.static(path_1.default.join(__dirname, 'images')));
//use routes
app.use('/api/v1/users', user_routes_1.default);
app.use('/api/v1/messages', message_routes_1.default);
// errors middlewares
app.use(error_middleware_1.default.internalError);
app.use(error_middleware_1.default.notFoundError);
const PORT = process.env.NODE_PORT || 1981;
const httpServer = (0, http_1.createServer)(app).listen(PORT, () => 
// eslint-disable-next-line no-console
console.log(`app listening on ${PORT}`));
const io = socket_1.default.init(httpServer);
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
io.on('connection', (socket) => {
    // eslint-disable-next-line no-console
    console.log('socket connected to client');
    socket.emit('message', 'hello world');
});
exports.default = app;
