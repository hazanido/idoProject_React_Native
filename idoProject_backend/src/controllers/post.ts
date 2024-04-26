import BaseController from "./base";
import Post, { IPost } from "../Model/postModel";
import { Request, Response } from "express";


class PostController extends BaseController<IPost> {
    constructor() {
        super(Post);
    }

async allPost (req:Request,res:Response){
    
    try {
        const posts = await Post.find({});
        res.json(posts);
    } catch (err) {
        res.status(500).send('Error retrieving posts from database');
    }

}

async deletePost (req:Request, res: Response){
    res.status(400);

}
}
export default new PostController();