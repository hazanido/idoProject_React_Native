import express from 'express';
const router = express.Router();
import UserController from '../controllers/user';
import userMiddleware from '../common/user_middleware';


/**
* @swagger
* tags:
*   name: User
*   description: The Authentication API
*/
/**
* @swagger
* components:
*   securitySchemes:
*     bearerAuth:
*       type: http
*       scheme: bearer
*       bearerFormat: JWT
*/
/**
 * @swagger
 * components:
 *   schemas:
 *      User:
 *       type: object
 *       required:
 *        - name
 *        - password
 *        - email
 *        - age
 *       properties:
 *         name:
 *          type: string
 *          description: The user's name.
 *         password:
 *          type: string
 *          description: The user's password.
 *         email:
 *          type: string
 *          description: The user's email.
 *         age:
 *          type: number
 *          description: The user's age.
 *       example:
 *        name: 'ido'
 *        email: 'ido@gmail.com'
 *        password: '123456'
 *        age: 25
 */

router.get("/", userMiddleware,UserController.getUser.bind(UserController));

router.delete('/:id',userMiddleware,UserController.remove.bind(UserController));

router.get("/",userMiddleware,UserController.getById.bind(UserController));

router.post("/", userMiddleware,UserController.post.bind(UserController));

router.put("/:id", userMiddleware,UserController.put.bind(UserController));

router.delete("/:id", userMiddleware,UserController.remove.bind(UserController));
/**
 * @swagger
 * /user/register:
 *  post:
 *   summary: Register a new user
 *   tags: [User]
 *   requestBody:
 *     required: true
 *     content:
 *      application/json:
 *          schema:
 *              $ref: '#/components/schemas/User'
 *   responses:
 *    200:
 *      description: The user was successfully registered
 *      content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/User'
 */
router.post('/register',UserController.register.bind(UserController));

router.post('/login',UserController.login.bind(UserController)); 

router.post('/logout',UserController.login.bind(UserController)); 

router.get('/refresh', UserController.refresh.bind(UserController));


export default router;