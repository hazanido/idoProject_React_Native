"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("./base"));
const userModel_1 = __importDefault(require("../Model/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserController extends base_1.default {
    constructor() {
        super(userModel_1.default);
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("testtttttt");
                if (req.query.name) {
                    const user = yield userModel_1.default.findOne({ name: req.query.name });
                    if (user) {
                        return res.status(200).json(user);
                    }
                    else {
                        return res.status(404).json({ message: 'User not found' });
                    }
                }
                else {
                    const users = yield userModel_1.default.find();
                    return res.status(200).json(users);
                }
            }
            catch (error) {
                console.error('Error getting users:', error);
                return res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("register");
            const email = req.body.email;
            const password = req.body.password;
            if (email == null || password == null) {
                return res.status(400).send("missing email or password");
            }
            try {
                const user = yield userModel_1.default.findOne({ email: email });
                if (user) {
                    return res.status(400).send("user already exists");
                }
                const salt = yield bcrypt_1.default.genSalt(10);
                const hashedPassword = yield bcrypt_1.default.hash(password, salt);
                const newUser = yield userModel_1.default.create({
                    name: req.body.name,
                    Password: hashedPassword,
                    email: req.body.email,
                    age: req.body.age,
                });
                return res.status(200).send(newUser);
            }
            catch (error) {
                console.log(error);
                return res.status(400).send(error.message);
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("login");
            const email = req.body.email;
            const password = req.body.password;
            if (email == null || password == null) {
                return res.status(400).send("missing email or password");
            }
            try {
                const user = yield userModel_1.default.findOne({ email: email });
                if (user == null) {
                    return res.status(400).send("invalid emil or password");
                }
                const validePassword = yield bcrypt_1.default.compare(password, user.Password);
                if (!validePassword) {
                    return res.status(400).send("invalid password");
                }
                const token = jsonwebtoken_1.default.sign({
                    _id: user._id
                }, process.env.TOKEN_SECRET, {
                    expiresIn: process.env.TOKEN_EXPIRATION
                });
                const refreshtoken = jsonwebtoken_1.default.sign({
                    _id: user._id
                }, process.env.REFRESH_TOKEN_SECRET);
                if (user.tokens == null) {
                    user.tokens = [refreshtoken];
                }
                else {
                    user.tokens.push(refreshtoken);
                }
                yield user.save();
                return res.status(200).send({
                    accessToken: token,
                    refreshtoken: refreshtoken
                });
            }
            catch (error) {
                console.log(error);
                return res.status(400).send(error.message);
            }
        });
    }
    refresh(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("refresh");
            const userHeader = req.headers['authorization'];
            const refreshToken = userHeader && userHeader.split(' ')[1];
            if (refreshToken == null) {
                return res.status(401).send("missing token");
            }
            try {
                const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
                req.body.user = decoded;
                const user = yield userModel_1.default.findById(req.body.user._id);
                console.log(user);
                if (user == null || user.tokens == null || !user.tokens.includes(refreshToken)) {
                    if (user.tokens != null) {
                        user.tokens = [];
                        yield user.save();
                    }
                    return res.status(403).send("invalid token");
                }
                const token = jsonwebtoken_1.default.sign({
                    _id: user._id
                }, process.env.TOKEN_SECRET, {
                    expiresIn: process.env.TOKEN_EXPIRATION
                });
                const newRefreshtoken = jsonwebtoken_1.default.sign({
                    _id: user._id
                }, process.env.REFRESH_TOKEN_SECRET, {});
                user.tokens = user.tokens.filter(token => token != refreshToken);
                user.tokens.push(newRefreshtoken);
                yield user.save();
                return res.status(200).send({
                    accessToken: token,
                    refreshtoken: newRefreshtoken
                });
            }
            catch (err) {
                return res.status(403).send("invalid token");
            }
        });
    }
}
exports.default = new UserController();
//# sourceMappingURL=user.js.map