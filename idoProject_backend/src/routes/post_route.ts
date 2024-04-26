import express from 'express';
const router = express.Router();
import postController from '../controllers/post';


router.post('/',postController.post.bind(postController));

router.get('/',postController.allPost.bind(postController));

router.delete('/:id',postController.remove.bind(postController));
    

export default router;