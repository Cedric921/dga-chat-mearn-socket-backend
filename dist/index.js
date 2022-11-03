"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
// db config import
const db_1 = __importDefault(require("./config/db"));
const app = (0, express_1.default)();
// routes and middlewares import
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const message_routes_1 = __importDefault(require("./routes/message.routes"));
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
dotenv_1.default.config();
(0, db_1.default)();
// middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.get('/', (req, res) => res.json({ message: 'hello world' }));
//use routes
app.use('/api/v1/users', user_routes_1.default);
app.use('/api/v1/messages', message_routes_1.default);
// errors middlewares
app.use(error_middleware_1.default.internalError);
app.use(error_middleware_1.default.notFoundError);
const PORT = process.env.NODE_PORT || 1981;
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`app listening on ${PORT}`));
