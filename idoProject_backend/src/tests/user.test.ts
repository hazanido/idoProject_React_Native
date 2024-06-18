import request from "supertest";
import appInit from "../App";
import mongoose from "mongoose";
import { Express } from "express";
import User, { IUser } from "../Model/userModel";
import Post from "../Model/postModel";

interface ITestUser {
    email: string;
    password: string;
    name: string;
    age: string;
}

const user: ITestUser = {
    email: "test@gmail.com",
    password: "123456",
    name: "ido",
    age: "24",
};

const newUser: ITestUser = {
    email: "newuser@gmail.com",
    password: "abcdef",
    name: "newuser",
    age: "30",
};

const tokenUser: ITestUser = {
    email: "tokenuser@gmail.com",
    password: "123456",
    name: "tokenuser",
    age: "27",
};

let app: Express;
let refreshToken: string;
let accessToken: string;

beforeAll(async () => {
    app = await appInit();
    await User.deleteMany({ email: { $in: [user.email, newUser.email, tokenUser.email] } });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("User test", () => {
    test("Post /register", async () => {
        const res = await request(app).post("/user/register").send(user);
        expect(res.statusCode).toBe(200);
    });

    test("Post /login", async () => {
        const res = await request(app).post("/user/login").send(user);
        expect(res.statusCode).toBe(200);

        accessToken = res.body.accessToken;
        refreshToken = res.body.refreshToken;
        expect(accessToken).not.toBeNull();
        expect(refreshToken).not.toBeNull();
    });

    test("Get /user", async () => {
        const res = await request(app).get("/user").set('Authorization', 'Bearer ' + accessToken);
        expect(res.statusCode).toBe(200);
    });

    test("Get /user/refresh", async () => {
        const res = await request(app).get("/user/refresh").set('Authorization', 'Bearer ' + refreshToken);
        expect(res.statusCode).toBe(200);

        const newAccessToken = res.body.accessToken;
        const newRefreshToken = res.body.refreshToken;
        expect(newAccessToken).not.toBeNull();
        expect(newRefreshToken).not.toBeNull();

        const res2 = await request(app).get("/user").set('Authorization', 'Bearer ' + newAccessToken);
        expect(res2.statusCode).toBe(200);
    });

    test("Post /logout", async () => {
        const loginRes = await request(app).post("/user/login").send(user);
        expect(loginRes.statusCode).toBe(200);
    
        const refreshToken = loginRes.body.refreshToken;
        const res = await request(app).post("/user/logout").set('Authorization', 'Bearer ' + refreshToken);
        expect(res.statusCode).toBe(200);
    
        const res2 = await request(app).get("/user").set('Authorization', 'Bearer ' + refreshToken);
        expect(res2.statusCode).not.toBe(200);
    });

    test("Get /user/:tokens", async () => {
        await request(app).post("/user/register").send(tokenUser);

        const loginRes = await request(app).post("/user/login").send(tokenUser);
        expect(loginRes.statusCode).toBe(200);

        const token = loginRes.body.refreshToken;

        const res = await request(app).get(`/user/${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.email).toBe(tokenUser.email);
    });

    test("Get /user/post/:tokens", async () => {
        const loginRes = await request(app).post("/user/login").send(tokenUser);
        expect(loginRes.statusCode).toBe(200);

        const token = loginRes.body.refreshToken;

        const res = await request(app).get(`/user/post/${token}`);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test("Put /user/put/:tokens", async () => {
        const loginRes = await request(app).post("/user/login").send(tokenUser);
        expect(loginRes.statusCode).toBe(200);

        const token = loginRes.body.refreshToken;

        const res = await request(app)
            .put(`/user/put/${token}`)
            .send({ name: "updatedTokenUser" });
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe("updatedTokenUser");
    });

    test("Delete /user/:id", async () => {
        const registerRes = await request(app).post("/user/register").send(newUser);
        expect(registerRes.statusCode).toBe(200);

        const loginRes = await request(app).post("/user/login").send(newUser);
        expect(loginRes.statusCode).toBe(200);

        const authToken = loginRes.body.accessToken;

        const deleteRes = await request(app)
            .delete(`/user/${registerRes.body._id}`)
            .set('Authorization', 'Bearer ' + authToken);

        expect(deleteRes.statusCode).toBe(200);

        const userAfterDelete = await User.findById(registerRes.body._id);
        expect(userAfterDelete).toBeNull();
    });

});
