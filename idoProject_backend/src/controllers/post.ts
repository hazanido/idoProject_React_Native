import Post from '../Model/postModel';
import { Request, Response } from 'express';



const newPost = async(req:Request,res:Response)=>{
    const message = req.body.message
    const sender = req.body.sender

    try {
        const post = new Post({
            message: message,
            sender: sender
        });
        const newPost = await post.save();
        console.log('add post to database');
        res.status(200).send(newPost)
        
    } catch (err) {
        console.error('failed to add data to database:', err);
        res.status(500).send('Failed to add data to database');
    }
};

const allPost = async (req:Request,res:Response)=>{
    
    try {
        const posts = await Post.find({});
        res.json(posts);
    } catch (err) {
        res.status(500).send('Error retrieving posts from database');
    }

}

const deletePost = async (req:Request, res: Response) => {
    res.status(400);

}
export default {newPost,allPost,deletePost};