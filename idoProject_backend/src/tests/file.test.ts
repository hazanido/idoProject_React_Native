// src/tests/file.test.ts

import request from "supertest";
import appInit from "../App";
import mongoose from "mongoose";
import { Express } from "express";
import path from "path";
import fs from "fs";
import multer from "multer";

let app: Express;

beforeAll(async () => {
    app = await appInit();
    console.log("beforeAll");

    // יצירת התיקייה imageUser אם היא לא קיימת
    const dir = path.join(__dirname, '../../imageUser');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
});

afterAll(async () => {
    console.log("afterAll");
    await mongoose.connection.close();
});

describe("Image upload tests", () => {
    test("Test successful image upload", async () => {
        console.log("Test successful image upload");
        const filePath = path.join(__dirname, "../tests/test-files/test-image.jpg");
        console.log(`Uploading file from: ${filePath}`);

        const res = await request(app)
            .post("/files/upload")
            .attach("file", filePath);

        console.log(`Response status code: ${res.statusCode}`);
        expect(res.statusCode).toBe(200);
        const data = res.body;
        console.log(data);
        expect(data).toHaveProperty("url");
    });

    test("Test upload with no file", async () => {
        console.log("Test upload with no file");
        const res = await request(app)
            .post("/files/upload");

        console.log(`Response status code: ${res.statusCode}`);
        expect(res.statusCode).toBe(400);
        const data = res.body;
        console.log(data);
        expect(data).toHaveProperty("message", "No file uploaded.");
    });

});
