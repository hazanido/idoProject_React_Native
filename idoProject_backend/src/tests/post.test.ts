import request from "supertest";
import appInit from "../App";
import mongoose from "mongoose";
import { Express } from "express";

let app: Express;
beforeAll(async () => {
    app = await appInit();
    console.log("beforeAll");
});

afterAll(async () => {
    console.log("afterAll");
    await mongoose.connection.close();
});

describe("Post tests", () => {
    test("Test get all post", async () => {
        console.log("Test Post get all");
        const res = await request(app).get("/post");
        expect(res.statusCode).toBe(200);
        const data = res.body;
        console.log(data);
    });

    test("Test create new post", async () => {
        console.log("Test Post create");
        const newPost = {
            _id: "666b36",
            title: "New Post",
            message: "This is a new post",
            sender: {
                _id: "666b350425f111286bfbb97a",
                name: "ido",
                imgUrl: "http://example.com/image.jpg"
            }
        };
        const res = await request(app)
            .post("/post")
            .send(newPost);
        expect(res.statusCode).toBe(201);
        const createdPost = res.body;
        expect(createdPost).toHaveProperty("title", newPost.title);
        expect(createdPost).toHaveProperty("message", newPost.message);
        expect(createdPost.sender).toEqual(expect.objectContaining(newPost.sender));
    });

    test("Test update post", async () => {
        console.log("Test Post update");
        const postId = "666b36";
        const updatedPost = {
            _id: "666b36",
            title: "Updated Post",
            message: "This is an updated post",
            sender: {
                _id: "666b350425f111286bfbb97a",
                name: "ido",
                imgUrl: "http://example.com/updated_image.jpg"
            }
        };
        const res = await request(app)
            .put(`/post/${postId}`)
            .send(updatedPost);
        expect(res.statusCode).toBe(200);
        const updated = res.body;
        console.log(updated.title, updated.message, updated.sender);
        expect(updated).toHaveProperty("title", updatedPost.title);
        expect(updated).toHaveProperty("message", updatedPost.message);
        expect(updated.sender).toEqual(expect.objectContaining(updatedPost.sender));
    });

    // test("Test delete post", async () => {
    //     console.log("Test Post delete");
    //     const postId = "666b36";
    //     const res = await request(app).delete(`/post/${postId}`);
    //     expect(res.statusCode).toBe(200);
    // });
});
