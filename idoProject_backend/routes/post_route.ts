import express from 'express';
const router = express.Router();
import post from '../controllers/post';


router.post('/',post.newPost);

router.get('/',post.allPost);

router.delete('/',post.deletePost);
    

export default router;