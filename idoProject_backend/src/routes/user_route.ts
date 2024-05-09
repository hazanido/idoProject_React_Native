import express from 'express';
const router = express.Router();
import UserController from '../controllers/user';
import userMiddleware from '../common/user_middleware';

router.get("/", userMiddleware,UserController.getUser.bind(UserController));

router.delete('/:id',userMiddleware,UserController.remove.bind(UserController));

router.get("/:id",UserController.getById.bind(UserController));

router.post("/", userMiddleware,UserController.post.bind(UserController));

router.put("/:id", userMiddleware,UserController.put.bind(UserController));

router.delete("/:id", userMiddleware,UserController.remove.bind(UserController));

router.post('/register',UserController.register.bind(UserController));

router.post('/login',UserController.login.bind(UserController)); 

router.post('/logout',UserController.login.bind(UserController)); 

router.get('/refresh', UserController.refresh.bind(UserController));

export default router;