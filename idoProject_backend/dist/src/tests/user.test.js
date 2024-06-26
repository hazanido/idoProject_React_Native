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
const userModel_1 = __importDefault(require("../Model/userModel"));
const user = {
    email: "test@gmail.com",
    password: "123456",
    name: "ido",
    age: "24",
};
let app;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    app = yield (0, App_1.default)();
    console.log("beforeAll");
    yield userModel_1.default.deleteMany({ email: user.email });
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("afterAll");
    yield mongoose_1.default.connection.close();
}));
describe("User test", () => {
    test("Post /register", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).post("/user/register").send(user);
        expect(res.statusCode).toBe(200);
    }));
    test("Post /login", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).post("/user/login").send(user);
        expect(res.statusCode).toBe(200);
        console.log(res.body);
        const accessToken = res.body.accessToken;
        const refreshToken = res.body.refreshToken;
        expect(accessToken).not.toBeNull();
        expect(refreshToken).not.toBeNull();
        const res2 = yield (0, supertest_1.default)(app).get("/user").set('Authorization', 'Bearer ' + accessToken);
        console.log("if1:", res2.body);
        expect(res2.statusCode).toBe(200);
        const fakeToken = accessToken + "0";
        const res3 = yield (0, supertest_1.default)(app).get("/user").set('Authorization', 'Bearer ' + fakeToken);
        expect(res3.statusCode).not.toBe(200);
    }));
    test("Get /refresh", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).post("/user/login").send(user);
        expect(res.statusCode).toBe(200);
        console.log(res.body);
        //const accessToken = res.body.accessToken;
        const refreshToken = res.body.refreshToken;
        console.log("befor refresh", res.body.refreshToken);
        const res2 = yield (0, supertest_1.default)(app).get("/user/refresh").set('Authorization', 'Bearer ' + refreshToken).send();
        expect(res2.statusCode).toBe(200);
        const accessToken2 = res2.body.accessToken;
        const refreshToken2 = res2.body.refreshToken;
        expect(accessToken2).not.toBeNull();
        expect(refreshToken2).not.toBeNull();
        const res3 = yield (0, supertest_1.default)(app).get("/user").set('Authorization', 'Bearer ' + accessToken2);
        expect(res3.statusCode).toBe(200);
        //  //test for accesstoken after time
        // await timout(6000);
        // const res4 = await request(app).get("/user").set('Authorization', 'Bearer ' + accessToken2);
        // expect(res4.statusCode).not.toBe(200);
    }));
    test("Get /refresh token violation", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).post("/user/login").send(user);
        expect(res.statusCode).toBe(200);
        console.log(res.body);
        //const accessToken = res.body.accessToken;
        const refreshToken = res.body.refreshToken;
        const oldRefreshToken = refreshToken;
        const res2 = yield (0, supertest_1.default)(app).get("/user/refresh").set('Authorization', 'Bearer ' + refreshToken).send();
        expect(res2.statusCode).toBe(200);
        const accessToken2 = res2.body.accessToken;
        const refreshToken2 = res2.body.refreshToken;
        expect(accessToken2).not.toBeNull();
        expect(refreshToken2).not.toBeNull();
        const res3 = yield (0, supertest_1.default)(app).get("/user/refresh").set('Authorization', 'Bearer ' + oldRefreshToken).send();
        expect(res3.statusCode).not.toBe(200);
        const res4 = yield (0, supertest_1.default)(app).get("/user/refresh").set('Authorization', 'Bearer ' + refreshToken2).send();
        expect(res4.statusCode).not.toBe(200);
    }));
    test("Post /logout", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).post("/user/login").send(user);
        expect(res.statusCode).toBe(200);
        console.log(res.body);
        const accessToken = res.body.accessToken;
        const refreshToken = res.body.refreshToken;
        expect(accessToken).not.toBeNull();
        expect(refreshToken).not.toBeNull();
        const res2 = yield (0, supertest_1.default)(app).post("/user/logout").set('Authorization', 'Bearer ' + refreshToken);
        expect(res2.statusCode).toBe(200);
        const res3 = yield (0, supertest_1.default)(app).get("/user").set('Authorization', 'Bearer ' + refreshToken);
        expect(res3.statusCode).not.toBe(200);
    }));
    test("Delete /user/:id", () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = {
            email: "test-delete@gmail.com",
            password: "123456",
            name: "testDelete",
            age: "25",
        };
        const registerRes = yield (0, supertest_1.default)(app).post("/user/register").send(newUser);
        expect(registerRes.statusCode).toBe(200);
        const loginRes = yield (0, supertest_1.default)(app).post("/user/login").send(newUser);
        expect(loginRes.statusCode).toBe(200);
        const authToken = loginRes.body.accessToken;
        const deleteRes = yield (0, supertest_1.default)(app)
            .delete("/user/" + registerRes.body._id)
            .set('Authorization', 'Bearer ' + authToken);
        expect(deleteRes.statusCode).toBe(200);
        const userAfterDelete = yield userModel_1.default.findById(registerRes.body._id);
        expect(userAfterDelete).toBeNull();
    }));
});
//# sourceMappingURL=user.test.js.map