"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_route_1 = __importDefault(require("./routes/user_route"));
const post_route_1 = __importDefault(require("./routes/post_route"));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
const appInit = () => {
    const promise = new Promise((resolve) => {
        try {
            console.log('Trying to connect to DB');
            mongoose_1.default.connect(process.env.DB_CONNECT);
            console.log('Connected to MongoDB.');
        }
        catch (error) {
            console.log('Error connecting to DB: ' + error);
        }
        app.use('/user', user_route_1.default);
        app.use('/post', post_route_1.default);
        app.get('/', (req, res) => {
            res.send('SERVER STARTED!');
        });
        resolve(app);
    });
    return promise;
};
exports.default = appInit;
//# sourceMappingURL=App.js.map