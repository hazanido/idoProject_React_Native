"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_1 = __importDefault(require("../controllers/user"));
const user_middleware_1 = __importDefault(require("../common/user_middleware"));
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
/**
 * @swagger
 * /user:
 *    get:
 *        summary: Get user or list of users
 *        tags: [User]
 *        security:
 *            - bearerAuth: []
 *        parameters:
 *            - in: query
 *              name: name
 *              schema:
 *                type: string
 *              description: Name of the user to retrieve
 *        responses:
 *            200:
 *                description: The user(s)
 *                content:
 *                    application/json:
 *                        schema:
 *                            type: array
 *                            items:
 *                                $ref: '#/components/schemas/User'
 *            404:
 *                description: User not found
 *                content:
 *                    application/json:
 *                        schema:
 *                            type: object
 *                            properties:
 *                                message:
 *                                    type: string
 *                                    example: User not found
 *            500:
 *                description: Internal server error
 *                content:
 *                    application/json:
 *                        schema:
 *                            type: object
 *                            properties:
 *                                message:
 *                                    type: string
 *                                    example: Internal server error
 */
router.get("/", user_middleware_1.default, user_1.default.getUser.bind(user_1.default));
/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Remove a user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User deleted successfully
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error message
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 */
router.delete('/:id', user_middleware_1.default, user_1.default.remove.bind(user_1.default));
/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error message
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 */
router.put("/:id", user_middleware_1.default, user_1.default.put.bind(user_1.default));
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
router.post('/register', user_1.default.register.bind(user_1.default));
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
router.post('/login', user_1.default.login.bind(user_1.default));
/**
* @swagger
* /user/logout:
*   post:
*     summary: Logout a user
*     tags:
*       - User
*     description: Logs out a user by providing the refresh token in the authorization header.
*     security:
*       - bearerAuth: []
*     responses:
*       '200':
*         description: Logout completed successfully
*       '401':
*         description: Unauthorized - Missing or invalid token
*       '403':
*         description: Forbidden - Invalid token or user not authorized to logout
*/
router.post('/logout', user_1.default.logout.bind(user_1.default));
/**
* @swagger
* /user/refresh:
*   get:
*       summary: get a new access token using the refresh token
*       tags: [User]
*       description: need to provide the refresh token in the auth header
*       security:
*           - bearerAuth: []
*       responses:
*           200:
*               description: The acess & refresh tokens
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Tokens'
*/
router.get('/refresh', user_1.default.refresh.bind(user_1.default));
exports.default = router;
//# sourceMappingURL=user_route.js.map