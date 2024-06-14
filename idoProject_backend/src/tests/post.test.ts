import request from "supertest";
import appInit from "../App";
import mongoose from "mongoose";
import { Express } from "express";
import { Types } from "mongoose";
import Post from "../Model/postModel"; 

let app: Express;
let postId: string;

beforeAll(async () => {
    app = await appInit();
    console.log("beforeAll");
});

beforeEach(async () => {
    console.log("beforeEach");
    await Post.deleteMany({});
    const newPost = {
        title: "Initial Post",
        message: "This is an initial post",
        sender: {
            _id: new Types.ObjectId().toHexString(),
            name: "ido",
            imgUrl: "http://example.com/image.jpg"
        }
    };

    const res = await request(app)
        .post("/post")
        .send(newPost);

    postId = res.body._id;
    console.log(`Created initial post with id: ${postId}`);
});

afterAll(async () => {
    console.log("afterAll");
    await mongoose.connection.close();
});

describe("Post tests", () => {
    test("Test get all posts", async () => {
        console.log("Test Post get all");
        const res = await request(app).get("/post");
        expect(res.statusCode).toBe(200);
        const data = res.body;
        console.log(data);
    });

    test("Test create new post", async () => {
        console.log("Test Post create");
        const newPost = {
            title: "New Post",
            message: "This is a new post",
            sender: {
                _id: new Types.ObjectId().toHexString(),
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

    test("Test get post by ID", async () => {
        console.log("Test Post get by ID");
        const res = await request(app).get(`/post/${postId}`);
        expect(res.statusCode).toBe(200);
        const post = res.body;
        console.log(post);
        expect(post).toHaveProperty("_id", postId);
        expect(post).toHaveProperty("title", "Initial Post");
        expect(post).toHaveProperty("message", "This is an initial post");
        expect(post.sender).toHaveProperty("_id");
        expect(post.sender).toHaveProperty("name", "ido");
        expect(post.sender).toHaveProperty("imgUrl", "http://example.com/image.jpg");
    });

    test("Test update post", async () => {
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

        const res = await request(app)
            .put(`/post/${postId}`)
            .send(updatedPost);
        expect(res.statusCode).toBe(200);
        const updated = res.body;
        console.log(updated);
        expect(updated).toHaveProperty("_id", postId);
        expect(updated).toHaveProperty("title", updatedPost.title);
        expect(updated).toHaveProperty("message", updatedPost.message);
        expect(updated.sender).toEqual(expect.objectContaining(updatedPost.sender));
    });

    test("Test delete post", async () => {
        console.log("Test Post delete");
        const res = await request(app).delete(`/post/${postId}`);
        expect(res.statusCode).toBe(200);
    });
});
