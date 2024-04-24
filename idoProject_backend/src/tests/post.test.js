const request = require("supertest");
const appInit = require("../App");
const mongoose = require("mongoose");
const post = require("../Model/postModel");

let app
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