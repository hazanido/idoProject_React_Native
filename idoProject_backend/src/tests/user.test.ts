import request from "supertest";
import appInit from "../App";
import mongoose from "mongoose";
import { Express } from "express";
import User from "../Model/userModel";


const user = {
    email: "test@gmail.com",
    password: "123456",
    name: "ido",
    age: "24",
    
}

let app: Express;

beforeAll(async () => {
    app = await appInit();
    console.log("beforeAll");
    await User.deleteMany({ email: user.email });
});

afterAll(async () => {
    console.log("afterAll");
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
        console.log(res.body);
    });
    // test("Post /logout", async () => {
    //     const res = await request(app).post("/user/login").send(user);
    //     expect(res.statusCode).toBe(200);
    // });
});