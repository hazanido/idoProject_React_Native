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
/**
* @swagger
* components:
*   schemas:
*     Tokens:
*       type: object
*       required:
*           - accessToken
*           - refreshToken
*       properties:
*           accessToken:
*               type: string
*               description: The JWT access token
*           refreshToken:
*               type: string
*               description: The JWT refresh token
*       example:
*           accessToken: '123cd123x1xx1'
*           refreshToken: '134r2134cr1x3c'
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
/**
* @swagger
* /user/login:
*   post:
*       summary: login a user
*       tags: [User]
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                     type: object 
*                     properties:
*                      email:
*                           type: string
*                      password:
*                           type: string
*                     example:   
*                           email: 'ido@gmail.com'
*                           password: '123456'
*       responses:
*           200:
*               description: The acess & refresh tokens
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Tokens'
*/
router.post('/login',UserController.login.bind(UserController)); 

router.get('/logout',UserController.login.bind(UserController)); 

router.get('/refresh', UserController.refresh.bind(UserController));


export default router;