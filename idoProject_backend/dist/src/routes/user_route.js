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
router.get("/", user_middleware_1.default, user_1.default.getUser.bind(user_1.default));
router.delete('/:id', user_middleware_1.default, user_1.default.remove.bind(user_1.default));
router.get("/", user_middleware_1.default, user_1.default.getById.bind(user_1.default));
router.post("/", user_middleware_1.default, user_1.default.post.bind(user_1.default));
router.put("/:id", user_middleware_1.default, user_1.default.put.bind(user_1.default));
router.delete("/:id", user_middleware_1.default, user_1.default.remove.bind(user_1.default));
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
router.post('/login', user_1.default.login.bind(user_1.default));
router.post('/logout', user_1.default.login.bind(user_1.default));
router.get('/refresh', user_1.default.refresh.bind(user_1.default));
exports.default = router;
//# sourceMappingURL=user_route.js.map