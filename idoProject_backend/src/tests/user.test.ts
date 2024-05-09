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

        const accessToken = res.body.accessToken;
        const refreshToken = res.body.refreshToken;
        expect(accessToken).not.toBeNull();
        expect(refreshToken).not.toBeNull();

        
        const res2 = await request(app).get("/user").set('Authorization', 'Bearer ' + accessToken);
        console.log("if1:" ,res2.body);
        expect(res2.statusCode).toBe(200);

        const fakeToken = accessToken + "0";
        const res3 = await request(app).get("/user").set('Authorization', 'Bearer ' + fakeToken);
        expect(res3.statusCode).not.toBe(200);
    });
     test("Get /refresh", async () => {
        const res = await request(app).post("/user/login").send(user);
        expect(res.statusCode).toBe(200);
        console.log(res.body);

        //const accessToken = res.body.accessToken;
        const refreshToken = res.body.refreshToken;
        console.log("befor refresh",res.body.refreshToken);

        const res2 = await request(app).get("/user/refresh").set('Authorization', 'Bearer ' + refreshToken).send();
        console.log("after refresh");
        expect(res2.statusCode).toBe(200);

        const accessToken2 = res2.body.accessToken; 
        const refreshToken2 = res2.body.refreshToken;
        expect(accessToken2).not.toBeNull();
        expect(refreshToken2).not.toBeNull();

        const res3 = await request(app).get("/user").set('Authorization', 'Bearer ' + accessToken2);
        expect(res3.statusCode).not.toBe(200);

    });

    // test("Post /logout", async () => {
    //     const res = await request(app).post("/user/login").send(user);
    //     expect(res.statusCode).toBe(200);
    // });
    
});