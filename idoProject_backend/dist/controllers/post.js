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
const postModel_1 = __importDefault(require("../Model/postModel"));
const newPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const message = req.body.message;
    const sender = req.body.sender;
    try {
        const post = new postModel_1.default({
            message: message,
            sender: sender
        });
        const newPost = yield post.save();
        console.log('add post to database');
        res.status(200).send(newPost);
    }
    catch (err) {
        console.error('failed to add data to database:', err);
        res.status(500).send('Failed to add data to database');
    }
});
const allPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield postModel_1.default.find({});
        res.json(posts);
    }
    catch (err) {
        res.status(500).send('Error retrieving posts from database');
    }
});
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(400);
});
exports.default = { newPost, allPost, deletePost };
//# sourceMappingURL=post.js.map