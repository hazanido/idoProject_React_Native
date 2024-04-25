import request from "supertest";
import appInit from "../App";
import mongoose from "mongoose";
import { Express } from "express";

let app: Express;
beforeAll( async () =>{
    app = await appInit();
    console.log("beforAll");
    
});

afterAll(async () =>{
    console.log("afterAll");
    await mongoose.connection.close();
});


describe("Post tests", () => {
    test("Test get all post",async () => {
        console.log("Test Post get all");
        const res = await request(app).get("/post");
        expect(res.statusCode).toBe(200);
        const data = res.body;
        console.log(data);
    });
});