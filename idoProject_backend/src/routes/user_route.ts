import express from 'express';
const router = express.Router();
import UserController from '../controllers/user';


router.post('/register',UserController.register.bind(UserController));
router.post('/login',UserController.login.bind(UserController)); 
router.delete('/:id',UserController.remove.bind(UserController));
router.get("/:id", UserController.getById.bind(UserController));
router.post("/", UserController.post.bind(UserController));
router.put("/:id", UserController.put.bind(UserController));
router.delete("/:id", UserController.remove.bind(UserController));

export default router;