"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const post_1 = __importDefault(require("../controllers/post"));
/**
 * @swagger
 * tags:
 *   name: Post
 *   description: API endpoints for managing posts
 */
/**
 *@swagger
 *components:
 *  schemas:
 *   Post:
 *     type: object
 *     required:
 *       - title
 *       - message
 *       - sender
 *     properties:
 *       title:
 *         type: string
 *         description: The post's title.
 *       message:
 *         type: string
 *         description: The post's message.
 *       sender:
 *         type: object
 *         description: The sender of the post.
 *         properties:
 *           _id:
 *             type: string
 *             description: The sender's ID.
 *           name:
 *             type: string
 *             description: The sender's name.
 *           imgUrl:
 *             type: string
 *             description: The sender's image URL.
 *     example:
 *       title: 'Sample Post Title'
 *       message: 'This is a sample post message.'
 *       sender:
 *         _id: '6662d0370781cf5fef32f831'
 *         name: 'ido'
 *         imgUrl: 'http://example.com/image.jpg'
 */
/**
 * @swagger
 * /post:
 *     post:
 *         summary: Create a new post
 *         tags: [Post]
 *         requestBody:
 *             required: true
 *             content:
 *              application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/Post'
 *         responses:
 *           200:
 *             description: The post was successfully created
 *             content:
 *                 application/json:
 *                     schema:
 *                       $ref: '#/components/schemas/Post'
*/
router.post('/', post_1.default.post.bind(post_1.default));
/**
 * @swagger
 * /post:
 *   get:
 *     summary: Get all posts
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: The list of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
router.get('/', post_1.default.get.bind(post_1.default));
/**
 * @swagger
 * /post/{id}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post ID
 *     responses:
 *       200:
 *         description: The post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: The post was not found
 */
router.get('/:id', post_1.default.getById.bind(post_1.default));
/**
 * @swagger
 * /post/{id}:
 *   put:
 *     summary: Update a post
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post ID
 *     requestBody:
 *         required: true
 *         content:
 *          application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: The post was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: The post was not found
 */
router.put('/:id', post_1.default.put.bind(post_1.default));
/**
 * @swagger
 * /post/{id}:
 *   delete:
 *     summary: Remove a post
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post ID
 *     responses:
 *       200:
 *         description: The post was deleted
 *       404:
 *         description: The post was not found
 */
router.delete('/:id', post_1.default.remove.bind(post_1.default));
exports.default = router;
//# sourceMappingURL=post_route.js.map