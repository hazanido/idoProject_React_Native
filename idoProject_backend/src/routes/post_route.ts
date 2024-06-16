import express from 'express';
const router = express.Router();
import postController from '../controllers/post';


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
 *         _id: '666eba52ad9fa7c9c653db90'
 *         name: 'ido'
 *         imgUrl: 'idoProject_backend/imageUser/defultImag.jpg'
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
router.post('/',postController.post.bind(postController));

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
router.get('/',postController.get.bind(postController));

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
router.get('/:id',postController.getById.bind(postController));

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
router.put('/:id',postController.put.bind(postController));

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
router.delete('/:id',postController.remove.bind(postController));


    

export default router;