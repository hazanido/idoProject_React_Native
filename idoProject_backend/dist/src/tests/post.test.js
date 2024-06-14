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
const supertest_1 = __importDefault(require("supertest"));
const App_1 = __importDefault(require("../App"));
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const postModel_1 = __importDefault(require("../Model/postModel"));
let app;
let postId;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    app = yield (0, App_1.default)();
    console.log("beforeAll");
}));
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("beforeEach");
    yield postModel_1.default.deleteMany({});
    const newPost = {
        title: "Initial Post",
        message: "This is an initial post",
        sender: {
            _id: new mongoose_2.Types.ObjectId().toHexString(),
            name: "ido",
            imgUrl: "http://example.com/image.jpg"
        }
    };
    const res = yield (0, supertest_1.default)(app)
        .post("/post")
        .send(newPost);
    postId = res.body._id;
    console.log(`Created initial post with id: ${postId}`);
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("afterAll");
    yield mongoose_1.default.connection.close();
}));
describe("Post tests", () => {
    test("Test get all posts", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Test Post get all");
        const res = yield (0, supertest_1.default)(app).get("/post");
        expect(res.statusCode).toBe(200);
        const data = res.body;
        console.log(data);
    }));
    test("Test create new post", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Test Post create");
        const newPost = {
            title: "New Post",
            message: "This is a new post",
            sender: {
                _id: new mongoose_2.Types.ObjectId().toHexString(),
                name: "ido",
                imgUrl: "http://example.com/image.jpg"
            }
        };
        const res = yield (0, supertest_1.default)(app)
            .post("/post")
            .send(newPost);
        expect(res.statusCode).toBe(201);
        const createdPost = res.body;
        expect(createdPost).toHaveProperty("title", newPost.title);
        expect(createdPost).toHaveProperty("message", newPost.message);
        expect(createdPost.sender).toEqual(expect.objectContaining(newPost.sender));
    }));
    test("Test get post by ID", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Test Post get by ID");
        const res = yield (0, supertest_1.default)(app).get(`/post/${postId}`);
        expect(res.statusCode).toBe(200);
        const post = res.body;
        console.log(post);
        expect(post).toHaveProperty("_id", postId);
        expect(post).toHaveProperty("title", "Initial Post");
        expect(post).toHaveProperty("message", "This is an initial post");
        expect(post.sender).toHaveProperty("_id");
        expect(post.sender).toHaveProperty("name", "ido");
        expect(post.sender).toHaveProperty("imgUrl", "http://example.com/image.jpg");
    }));
    test("Test update post", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Test Post update");
        const updatedPost = {
            title: "Updated Post",
            message: "This is an updated post",
            sender: {
                _id: "666b350425f111286bfbb97a",
                name: "ido",
                imgUrl: "http://example.com/updated_image.jpg"
            }
        };
        const res = yield (0, supertest_1.default)(app)
            .put(`/post/${postId}`)
            .send(updatedPost);
        expect(res.statusCode).toBe(200);
        const updated = res.body;
        console.log(updated);
        expect(updated).toHaveProperty("_id", postId);
        expect(updated).toHaveProperty("title", updatedPost.title);
        expect(updated).toHaveProperty("message", updatedPost.message);
        expect(updated.sender).toEqual(expect.objectContaining(updatedPost.sender));
    }));
    test("Test delete post", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Test Post delete");
        const res = yield (0, supertest_1.default)(app).delete(`/post/${postId}`);
        expect(res.statusCode).toBe(200);
    }));
});
//# sourceMappingURL=post.test.js.map