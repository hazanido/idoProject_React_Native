import BaseController from "./base";
import Post, { IPost } from "../Model/postModel";
import { Request, Response } from "express";


class PostController extends BaseController<IPost> {
    constructor() {
        super(Post);
    }

    async post(req: Request, res: Response) {
        super.post(req, res);
    }

}
export default new PostController();