import express from 'express';
const router = express.Router();
import user from '../controllers/user';


router.post('/',user.newUser);

    

export default router;