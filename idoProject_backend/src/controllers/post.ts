import BaseController from "./base";
import Post, { IPost } from "../Model/postModel";
import { Request, Response } from "express";
import User from "../Model/userModel";


class PostController extends BaseController<IPost> {
    constructor() {
        super(Post);
    }

    async post(req: Request, res: Response) {
        super.post(req, res);
    }
    async createPost(req: Request, res: Response) {
        try {
            const { title, message, sender } = req.body;

            if (!title || !message || !sender) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            const user = await User.findById(sender._id);
            if (!user) {
                return res.status(404).json({ message: 'Sender not found' });
            }

            const newPost = new Post({
                title,
                message,
                sender: user._id
            });

            await newPost.save();

            res.status(201).json(newPost);
        } catch (error) {
            console.error('Error creating post:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

}
export default new PostController();